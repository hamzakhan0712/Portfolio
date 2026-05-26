export function Background() {
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none w-full h-full">
      {/* Solid base */}
      <div className="absolute inset-0 bg-background" />

      {/* Dotted grid layer with faded edges */}
      <div className="absolute inset-0 bg-dot-grid grid-mask" />

      {/* Top-right primary glow */}
      <div
        className="absolute -top-32 -right-32 w-[40vw] h-[40vw] min-w-[420px] min-h-[420px] rounded-full blur-[120px] opacity-50 dark:opacity-40 animate-float-slow"
        style={{
          background:
            "radial-gradient(circle, hsl(var(--glow-primary) / 0.55) 0%, hsl(var(--glow-primary) / 0) 70%)",
        }}
      />

      {/* Bottom-left secondary glow */}
      <div
        className="absolute -bottom-40 -left-40 w-[45vw] h-[45vw] min-w-[460px] min-h-[460px] rounded-full blur-[140px] opacity-40 dark:opacity-35 animate-float-medium"
        style={{
          background:
            "radial-gradient(circle, hsl(var(--glow-secondary) / 0.45) 0%, hsl(var(--glow-secondary) / 0) 70%)",
        }}
      />

      {/* Soft center accent */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30vw] h-[30vw] min-w-[340px] min-h-[340px] rounded-full blur-[110px] opacity-25 dark:opacity-20 animate-float-fast"
        style={{
          background:
            "radial-gradient(circle, hsl(var(--glow-primary) / 0.4) 0%, hsl(var(--glow-primary) / 0) 70%)",
        }}
      />

      {/* Vignette to anchor content */}
      <div
        className="absolute inset-0 opacity-60 dark:opacity-80"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, hsl(var(--background)) 100%)",
        }}
      />

      {/* Fine noise/grain overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-[0.025] dark:opacity-[0.04]" />
    </div>
  );
}
