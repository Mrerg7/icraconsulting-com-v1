interface Env {
  ASSETS: Fetcher;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    const cfVisitor = request.headers.get('CF-Visitor');
    if (cfVisitor) {
      try {
        const visitor = JSON.parse(cfVisitor);
        if (visitor.scheme === 'http') {
          url.protocol = 'https:';
          return Response.redirect(url.toString(), 301);
        }
      } catch {}
    }

    if (url.hostname === 'www.icraconsulting.com') {
      url.hostname = 'icraconsulting.com';
      return Response.redirect(url.toString(), 301);
    }

    if (url.pathname === '/index.html') {
      url.pathname = '/';
      return Response.redirect(url.toString(), 301);
    }

    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
