Welcome to your new TanStack Start app!

# Getting Started

To run this application:

```bash
npm install
npm run dev
```

# Building For Production

To build this application for production:

```bash
npm run build
```

## Booking notifications with Amazon SES

Every successfully saved registration attempts an SES email to `NOTIFICATION_EMAIL`
from `FROM_EMAIL`, containing the booking ID, patient contact details, reason,
category, and appointment date/time (Asia/Kolkata).

Set these server environment variables (see `.env.example`):

```dotenv
AWS_REGION=ap-south-1
AWS_ACCESS_KEY_ID=your-existing-iam-access-key
AWS_SECRET_ACCESS_KEY=your-existing-iam-secret-key
FROM_EMAIL=bookings@example.com
NOTIFICATION_EMAIL=doctor@example.com
```

SES uses the AWS SDK default credential chain, just like S3; an attached IAM role
or shared AWS profile also works. Temporary credentials also need `AWS_SESSION_TOKEN`.
Use AWS API credentials, not SES SMTP credentials. Never prefix these variables with `VITE_`.

In the SES console for `AWS_REGION`, verify `FROM_EMAIL` or its domain. If the
account is in the SES sandbox, also verify `NOTIFICATION_EMAIL`, or request
production access to send to unverified recipients. Verification and sandbox
status are regional.

Attach this additional IAM policy to the existing application user, keeping its
existing S3 permissions. Replace `REGION`, `ACCOUNT_ID`, `VERIFIED_IDENTITY`, and
the two example email addresses with actual values. `VERIFIED_IDENTITY` is the
verified domain (e.g. `example.com`) or verified sender address (e.g.
`bookings@example.com`). IAM does not substitute application environment variables.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "SendBookingNotifications",
      "Effect": "Allow",
      "Action": "ses:SendEmail",
      "Resource": "arn:aws:ses:REGION:ACCOUNT_ID:identity/VERIFIED_IDENTITY",
      "Condition": {
        "StringEquals": {
          "ses:FromAddress": "bookings@example.com"
        },
        "ForAllValues:StringEquals": {
          "ses:Recipients": ["doctor@example.com"]
        }
      }
    }
  ]
}
```

The application uses `SendEmail`; it does not need `ses:SendRawEmail` or SES admin
permissions. See [AWS SES IAM guidance](https://docs.aws.amazon.com/ses/latest/dg/control-user-access.html)
and [SES sandbox requirements](https://docs.aws.amazon.com/ses/latest/dg/request-production-access.html).

The send is awaited after the booking is persisted, outside the storage retry
loop, with a 10-second send timeout. Missing configuration and SES failures are
logged with the booking ID, and the saved booking still succeeds. There is no
durable retry queue: this is a best-effort notification, not guaranteed delivery.
After configuring AWS, submit a test booking and check the recipient inbox and
server logs. SES acceptance does not guarantee inbox delivery.

## Styling

This project uses [Tailwind CSS](https://tailwindcss.com/) for styling.

### Removing Tailwind CSS

If you prefer not to use Tailwind CSS:

1. Remove the demo pages in `src/routes/demo/`
2. Replace the Tailwind import in `src/styles.css` with your own styles
3. Remove `tailwindcss()` from the plugins array in `vite.config.ts`
4. Remove `@tailwindcss/vite` and `tailwindcss` from `package.json`

## Linting & Formatting

This project uses [eslint](https://eslint.org/) and [prettier](https://prettier.io/) for linting and formatting. Eslint is configured using [tanstack/eslint-config](https://tanstack.com/config/latest/docs/eslint). The following scripts are available:

```bash
npm run lint
npm run format
npm run check
```

## Routing

This project uses [TanStack Router](https://tanstack.com/router) with file-based routing. Routes are managed as files in `src/routes`.

### Adding A Route

To add a new route to your application just add a new file in the `./src/routes` directory.

TanStack will automatically generate the content of the route file for you.

Now that you have two routes you can use a `Link` component to navigate between them.

### Adding Links

To use SPA (Single Page Application) navigation you will need to import the `Link` component from `@tanstack/react-router`.

```tsx
import { Link } from '@tanstack/react-router'
```

Then anywhere in your JSX you can use it like so:

```tsx
<Link to="/about">About</Link>
```

This will create a link that will navigate to the `/about` route.

More information on the `Link` component can be found in the [Link documentation](https://tanstack.com/router/v1/docs/framework/react/api/router/linkComponent).

### Using A Layout

In the File Based Routing setup the layout is located in `src/routes/__root.tsx`. Anything you add to the root route will appear in all the routes. The route content will appear in the JSX where you render `{children}` in the `shellComponent`.

Here is an example layout that includes a header:

```tsx
import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'My App' },
    ],
  }),
  shellComponent: ({ children }) => (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <header>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
          </nav>
        </header>
        {children}
        <Scripts />
      </body>
    </html>
  ),
})
```

More information on layouts can be found in the [Layouts documentation](https://tanstack.com/router/latest/docs/framework/react/guide/routing-concepts#layouts).

## Server Functions

TanStack Start provides server functions that allow you to write server-side code that seamlessly integrates with your client components.

```tsx
import { createServerFn } from '@tanstack/react-start'

const getServerTime = createServerFn({
  method: 'GET',
}).handler(async () => {
  return new Date().toISOString()
})

// Use in a component
function MyComponent() {
  const [time, setTime] = useState('')

  useEffect(() => {
    getServerTime().then(setTime)
  }, [])

  return <div>Server time: {time}</div>
}
```

## API Routes

You can create API routes by using the `server` property in your route definitions:

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'

export const Route = createFileRoute('/api/hello')({
  server: {
    handlers: {
      GET: () => json({ message: 'Hello, World!' }),
    },
  },
})
```

## Data Fetching

There are multiple ways to fetch data in your application. You can use TanStack Query to fetch data from a server. But you can also use the `loader` functionality built into TanStack Router to load the data for a route before it's rendered.

For example:

```tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/people')({
  loader: async () => {
    const response = await fetch('https://swapi.dev/api/people')
    return response.json()
  },
  component: PeopleComponent,
})

function PeopleComponent() {
  const data = Route.useLoaderData()
  return (
    <ul>
      {data.results.map((person) => (
        <li key={person.name}>{person.name}</li>
      ))}
    </ul>
  )
}
```

Loaders simplify your data fetching logic dramatically. Check out more information in the [Loader documentation](https://tanstack.com/router/latest/docs/framework/react/guide/data-loading#loader-parameters).

# Learn More

You can learn more about all of the offerings from TanStack in the [TanStack documentation](https://tanstack.com).

For TanStack Start specific documentation, visit [TanStack Start](https://tanstack.com/start).
