import { Elysia } from 'elysia';
import * as th from 'typed-html';

export const root = new Elysia()
  .get('/', () => <Root>
    <div hx-get={'/htmx/todos'} hx-trigger={'load'} hx-swap={'outerHTML'}>
      hello
    </div>
  </Root>);

const Root = ({ children }: th.Children) => `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>BETH POC</title>
    <script src="https://unpkg.com/htmx.org@1.9.5" integrity="sha384-xcuj3WpfgjlKF+FXhSQFQ0ZNr39ln+hwjN3npfM9VBnUskLolQAcN80McRIVOPuO" crossorigin="anonymous"></script>
    <link href="/style.css" rel="stylesheet">
</head>
<body>
${children}
</body>
</html>
`;
