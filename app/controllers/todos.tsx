import { Elysia, t } from 'elysia';
import * as th from 'typed-html';

export const todos = new Elysia().group('/todos', (todos) =>
  todos
    .get('/:id',
      ({ params }) => <div id={'content'} class={'text-2xl'}>{params.id}</div>,
      {
        params: t.Object({
          id: t.Numeric(),
        }),
      })
    .get('/', () => <div>
      hello
      <div id={'content'}>

      </div>
      <button class={'fill-amber-50 border-4 rounded-2xl'}
        hx-get={`/htmx/todos/1`}
        hx-target={'#content'}
        hx-swap={'outerHTML'}>
        click me
      </button>
    </div>)
);
