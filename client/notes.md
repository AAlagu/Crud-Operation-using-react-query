\***\*React Query\*\***
Hooks for fetching, caching and updating asynchronous data in React.
One of the best tools for data fetching and server state management.
[Caching, Background, Deduping, Optimistic updates, data fetching, Global state, Mutations]

## QueryClient

This can be used to interact with a cache.

## Quick features

1. Transport/protocol/backend agnostic data fetching (REST, GraphQL, promises, whatever!)
2. Auto Caching + Refetching (stale-while-revalidate, Window Refocus, Polling/Realtime)
3. Parallel + Dependent Queries
4. Mutations + Reactive Query Refetching
5. Multi-layer Cache + Automatic Garbage Collection
6. Paginated + Cursor-based Queries
7. Load-More + Infinite Scroll Queries w/ Scroll Recovery
8. Request Cancellation
9. React Suspense + Fetch-As-You-Render Query Prefetching
10. Dedicated Devtools

Queries, Mutations, Query Invalidation. These three concepts make up most of the core functionality of React Query.

import { ReactQueryDevtools } from 'react-query/devtools' -help visualize all of the inner workings of React Query and will likely save you hours of debugging if you find yourself in a pinch!

useQuery - (to fetch data) pulling the data from a server.
useMutation - (to post, update, delete) sending data to the server to change something.
QueryCache - storage the data in cache (rather that rego back to the server every time )
usePaginatedQuery

status, error

To install
yarn add react-query
