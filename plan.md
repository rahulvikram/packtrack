Admin/Customer Route Protection
- Use clerk middleware authorization-based protection to restrict access to routes based on user role.
- ref: https://clerk.com/docs/reference/nextjs/clerk-middleware



Order History Page
- On Track Package button click: pop up a modal so user can enter the tracking number and click on Track Package button to add package to order history tracking.
- When user adds package to order history, call backend API route to fetch package details and add to order history tracking.


Express API Layer
- Built with Node.js and Express, exposes a set of RESTful API endpoints for all system operations.
- Handles authentication and authorization for both admin and customer routes (e.g. via Clerk-provided middleware or tokens).
- Implements RESTful routes for:
    - Producing
        - Creating a package tracking entry (when customer adds a new tracking number)
        - Updating package status and details (admin only)
        - Deleting package entry from tracking system
    - Consuming
        - Fetching package by tracking ID
        - Listing all packages for a given user
        - Deleting/canceling a package tracking entry
- Integrates with PostgreSQL to read/write user and package data.
- Publishes package status updates as events to RabbitMQ to enable asynchronous processing and downstream integrations.
- Emits real-time events to connected clients (e.g., with Socket.IO) for live status updates.
- Includes rate limiting, logging, and error handling middleware for robust production use.
- Serves as the main orchestration layer between frontend, database, event stream (RabbitMQ), and real-time updates.

Redux Toolkit Query Integration:
- Use Redux Toolkit Query to fetch package details and perform data caching on the client side.

Socket.IO Integration:
- Use Socket.IO to receive real-time updates for package status changes.

RabbitMQ Integration:
- Async / Workers
    - Dedicated Node.js worker services
    - Use amqplib for RabbitMQ consumers
- Separate processes from the API

Deployment
- Use similar deployment strategy as the one used for personal website.


Example workflow:
1. Admin updates package delivery status via React frontend
2. React frontend updates package delivery via Express API
3. Express API publishes package delivery event to RabbitMQ
4. RabbitMQ Node.js worker services consume the event and update the package delivery status in the PostgreSQL database
5. PostgreSQL database writes the event logs to S3
6. Customer receives real-time package delivery updates via Socket.IO

High-Level Architecture:
                         +----------------------------+
                         |        React Frontend      |
                         |   RTK Query for APIs       |
                         |  WebSocket live updates    |
                         +-------------+--------------+
                                       |
                                       | HTTPS
                                       v
+----------------------+     +-----------------------------+
| AWS API Gateway      | --> | Node.js + Express Backend   |
| Routing, auth        |     | REST APIs, auth, validation |
+----------------------+     +------+----------------------+
                                      |
                         Publishes    |   Reads
                         Events       |
                                      v
                        +-------------------------------+
                        | RabbitMQ                      |
                        | Exchanges, queues, routing    |
                        +-------------+-----------------+
                                      |
                         Consumers    |
                                      v
            +------------------------------------------------+
            | Node.js Worker Services                        |
            | - Consume RabbitMQ events                     |
            | - Update PostgreSQL                            |
            | - Write event logs to S3                       |
            | - Trigger SNS notifications                   |
            +--------------+--------------------------------+
                           |
                           | SQL
                           v
            +----------------------------------------------+
            | PostgreSQL (Amazon RDS)                       |
            | Users, packages, delivery state               |
            +----------------------------------------------+
                           |
                           | Batch / stream
                           v
            +----------------------------------------------+
            | Amazon S3 (Data Lake)                         |
            | delivery_events/YYYY/MM/DD/*.parquet         |
            +----------------------------------------------+

