import { cors } from '@elysiajs/cors';
import { cookie } from '@elysiajs/cookie';
import { staticPlugin } from '@elysiajs/static';
import { todos } from '@/controllers/todos';
import { Elysia } from 'elysia';
import { swagger } from '@elysiajs/swagger';
import { html } from '@elysiajs/html';
import { root } from './html';
import { DynamicRoute, HtmxRoute, RouteWithMethod } from '@/types/utility';

const app = new Elysia()
  .use(staticPlugin({ prefix: '' }))
  .use(cors())
  .use(cookie())
  .use(swagger())
  .use(html())
  .use(root)
  .group('/htmx', htmx =>
    htmx
      .use(todos)
  )
  .listen(3000);

console.log(`Server running at http://${app.server?.hostname}:${app.server?.port}/`);

export type App = typeof app;
type RouteSchema = App['meta']['schema'];
type GetRoutes = RouteWithMethod<RouteSchema, 'get'>;
type PostRoutes = RouteWithMethod<RouteSchema, 'post'>;
type PutRoutes = RouteWithMethod<RouteSchema, 'put'>;
type DeleteRoutes = RouteWithMethod<RouteSchema, 'delete'>;
type PatchRoutes = RouteWithMethod<RouteSchema, 'patch'>;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface HtmlTag {
      ['hx-get']?: DynamicRoute<HtmxRoute<GetRoutes>>;
      ['hx-post']?: DynamicRoute<HtmxRoute<PostRoutes>>;
      ['hx-put']?: DynamicRoute<HtmxRoute<PutRoutes>>;
      ['hx-delete']?: DynamicRoute<HtmxRoute<DeleteRoutes>>;
      ['hx-patch']?: DynamicRoute<HtmxRoute<PatchRoutes>>;
      ['hx-trigger']?: 'load' | (string & {});
      ['hx-target']?: 'this' | `closest ${string}` | `#${string}` | `.${string}` | `find ${string}` | `next ${string}` | `previous ${string}` | (string & {});
      ['hx-swap']?: 'innerHTML' | 'outerHTML' | 'beforebegin' | 'afterbegin' | 'beforeend' | 'afterend' | 'delete' | 'none' | (string & {});
    }
  }
}
