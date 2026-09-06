import { Fragment, type ReactNode } from "react";

/**
 * A small, dependency-free syntax highlighter.
 *
 * Shiki and Prism both cost more than this page can justify — the samples are
 * short, the grammars needed are four, and a highlighter that ships no
 * kilobytes is the right trade for a reference whose whole argument is that it
 * is cheap to serve. Token classes are named by role (`tok-key`, `tok-str`)
 * and coloured in `index.css`, so the theme owns the palette, not this file.
 */

export type Language = "json" | "bash" | "python" | "javascript" | "http";

type Token = { text: string; cls?: string };

const PY_KEYWORDS =
  /^(import|from|as|def|return|print|if|else|elif|for|in|while|with|try|except|None|True|False|class|pass|raise|await|async)$/;
const JS_KEYWORDS =
  /^(const|let|var|function|return|await|async|if|else|for|of|in|new|null|undefined|true|false|import|export|from|class|try|catch|throw)$/;

/* ── JSON ─────────────────────────────────────────────────────────────── */

// Order matters: strings first so punctuation inside them is not re-matched.
const JSON_PATTERN =
  /("(?:\\.|[^"\\])*"\s*:)|("(?:\\.|[^"\\])*")|(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)|(\btrue\b|\bfalse\b|\bnull\b)|([{}[\],:])/g;

function tokenizeJson(line: string): Token[] {
  const tokens: Token[] = [];
  let last = 0;
  let match: RegExpExecArray | null;

  JSON_PATTERN.lastIndex = 0;
  while ((match = JSON_PATTERN.exec(line)) !== null) {
    if (match.index > last) {
      tokens.push({ text: line.slice(last, match.index) });
    }
    const [text, key, str, num, lit, punc] = match;
    if (key) tokens.push({ text, cls: "tok-key" });
    else if (str) tokens.push({ text, cls: "tok-str" });
    else if (num) tokens.push({ text, cls: "tok-num" });
    else if (lit) tokens.push({ text, cls: "tok-lit" });
    else if (punc) tokens.push({ text, cls: "tok-punc" });
    last = match.index + text.length;
  }

  if (last < line.length) tokens.push({ text: line.slice(last) });
  return tokens;
}

/* ── Shell ────────────────────────────────────────────────────────────── */

const SHELL_PATTERN = /('[^']*'|"[^"]*")|(\s-{1,2}[A-Za-z][\w-]*)|(#.*$)/g;

function tokenizeShell(line: string): Token[] {
  if (line.trimStart().startsWith("#")) {
    return [{ text: line, cls: "tok-comment" }];
  }

  const tokens: Token[] = [];
  let last = 0;
  let match: RegExpExecArray | null;

  // The leading command word, before any flag or argument.
  const command = /^(\s*)([A-Za-z][\w.-]*)/.exec(line);
  if (command) {
    if (command[1]) tokens.push({ text: command[1] });
    tokens.push({ text: command[2], cls: "tok-cmd" });
    last = command[0].length;
  }

  SHELL_PATTERN.lastIndex = last;
  while ((match = SHELL_PATTERN.exec(line)) !== null) {
    if (match.index > last) tokens.push({ text: line.slice(last, match.index) });
    const [text, str, flag, comment] = match;
    if (str) tokens.push({ text, cls: "tok-str" });
    else if (flag) tokens.push({ text, cls: "tok-flag" });
    else if (comment) tokens.push({ text, cls: "tok-comment" });
    last = match.index + text.length;
  }

  if (last < line.length) tokens.push({ text: line.slice(last) });
  return tokens;
}

/* ── Python and JavaScript ────────────────────────────────────────────── */

const CODE_PATTERN =
  /('[^']*'|"[^"]*"|`[^`]*`)|(#.*$|\/\/.*$)|(\b\d+(?:\.\d+)?\b)|([A-Za-z_$][\w$]*)/g;

function tokenizeCode(line: string, keywords: RegExp): Token[] {
  const tokens: Token[] = [];
  let last = 0;
  let match: RegExpExecArray | null;

  CODE_PATTERN.lastIndex = 0;
  while ((match = CODE_PATTERN.exec(line)) !== null) {
    if (match.index > last) tokens.push({ text: line.slice(last, match.index) });
    const [text, str, comment, num, word] = match;
    if (str) tokens.push({ text, cls: "tok-str" });
    else if (comment) tokens.push({ text, cls: "tok-comment" });
    else if (num) tokens.push({ text, cls: "tok-num" });
    else if (word && keywords.test(word)) tokens.push({ text, cls: "tok-flag" });
    else tokens.push({ text });
    last = match.index + text.length;
  }

  if (last < line.length) tokens.push({ text: line.slice(last) });
  return tokens;
}

/* ── HTTP request line ────────────────────────────────────────────────── */

function tokenizeHttp(line: string): Token[] {
  const match = /^(GET|POST|PUT|PATCH|DELETE)(\s+)(\S+)(.*)$/.exec(line);
  if (!match) return [{ text: line }];
  return [
    { text: match[1], cls: "tok-cmd" },
    { text: match[2] },
    { text: match[3], cls: "tok-str" },
    { text: match[4], cls: "tok-comment" },
  ];
}

function tokenize(line: string, language: Language): Token[] {
  switch (language) {
    case "json":
      return tokenizeJson(line);
    case "bash":
      return tokenizeShell(line);
    case "python":
      return tokenizeCode(line, PY_KEYWORDS);
    case "javascript":
      return tokenizeCode(line, JS_KEYWORDS);
    case "http":
      return tokenizeHttp(line);
    default:
      return [{ text: line }];
  }
}

/**
 * Highlights `source`, optionally revealing only the first `lines` lines so a
 * caller can stream it in without re-tokenising on every frame.
 */
export function highlight(
  source: string,
  language: Language,
  lines?: number,
): ReactNode {
  const all = source.split("\n");
  const visible = typeof lines === "number" ? all.slice(0, lines) : all;

  return visible.map((line, lineIndex) => (
    <Fragment key={lineIndex}>
      {line.length === 0
        ? "\u00A0"
        : tokenize(line, language).map((token, index) =>
            token.cls ? (
              <span key={index} className={token.cls}>
                {token.text}
              </span>
            ) : (
              <Fragment key={index}>{token.text}</Fragment>
            ),
          )}
      {lineIndex < visible.length - 1 ? "\n" : null}
    </Fragment>
  ));
}
