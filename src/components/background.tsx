import React from "react";

export function Background() {
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none w-full h-full">
      {/* Sophisticated Background Effects with Primary Color Theme */}
      
      {/* Main ambient glow - top right */}
      <div className="absolute rounded-full filter blur-[120px] animate-float-slow top-0 right-0 w-[40vw] h-[40vw] min-w-[400px] min-h-[400px] bg-gradient-to-br from-primary/20 via-primary/10 to-transparent opacity-60 dark:opacity-40" />
      
      {/* Secondary glow - bottom left */}
      <div className="absolute rounded-full filter blur-[140px] animate-float-medium bottom-0 left-0 w-[50vw] h-[50vw] min-w-[450px] min-h-[450px] bg-gradient-to-tr from-primary/15 via-primary/8 to-transparent opacity-50 dark:opacity-35" />
      
      {/* Accent glow - center */}
      <div className="absolute rounded-full filter blur-[100px] animate-float-fast top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30vw] h-[30vw] min-w-[350px] min-h-[350px] bg-gradient-to-r from-primary/10 via-primary/5 to-transparent opacity-40 dark:opacity-25" />
      
      {/* Subtle accent - top left */}
      <div className="absolute rounded-full filter blur-[90px] animate-float-slow top-1/4 left-1/4 w-[25vw] h-[25vw] min-w-[300px] min-h-[300px] bg-gradient-to-br from-primary/12 to-transparent opacity-30 dark:opacity-20" />
      
      {/* Bottom right accent */}
      <div className="absolute rounded-full filter blur-[110px] animate-float-medium bottom-1/4 right-1/4 w-[35vw] h-[35vw] min-w-[320px] min-h-[320px] bg-gradient-to-tl from-primary/18 via-primary/8 to-transparent opacity-45 dark:opacity-30" />
      
      {/* Grain texture overlay for depth */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-[0.015] dark:opacity-[0.025]" />
    </div>
  );
}