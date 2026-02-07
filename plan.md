Admin/Customer Route Protection
- Use clerk middleware authorization-based protection to restrict access to routes based on user role.
- ref: https://clerk.com/docs/reference/nextjs/clerk-middleware



Order History Page
- On Track Package button click: pop up a modal so user can enter the tracking number and click on Track Package button to add package to order history tracking.
- When user adds package to order history, call backend API route to fetch package details and add to order history tracking.


Express API Layer


Redux Toolkit Query Integration:
- Use Redux Toolkit Query to fetch package details and perform data caching on the client side.

WebSockets Integration:
- Use WebSockets to receive real-time updates for package status changes.



                         +----------------------------+
                         |        React Frontend      |
                         |   RTK Query for all data   |
                         |  WebSocket for live alerts |
                         +-------------+--------------+
                                       |
                                       | HTTPS
                                       v
+----------------------+     +---------------------------+
| AWS API Gateway      | --> | Flask Backend on ECS/EC2  |
| Auth, REST routing   |     | Package + user services  |
+----------------------+     +-----+---------------------+
                                      |
                         Publishes    |   Reads
                         Events       |
                                      v
                        +------------------------------+
                        | RabbitMQ (Amazon MQ or EC2) |
                        | Exchanges, queues, routing  |
                        +-------------+----------------+
                                      |
                         Consumers    |
                                      v
                    +-----------------------------------+
                    | Celery Workers (RabbitMQ broker) |
                    | Status processing                |
                    | Notifications                    |
                    | Audit logging                    |
                    +--------------+--------------------+
                                   |
                                   | SQL
                                   v
                 +---------------------------------------+
                 | PostgreSQL on Amazon RDS               |
                 | Users, packages, events, delivery log  |
                 +---------------------------------------+
                                   |
                                   | Object storage
                                   v
                     +-----------------------------------+
                     | Amazon S3                         |
                     | Delivery photos, signatures       |
                     +-----------------------------------+
                                   |
                                   | Notifications
                                   v
                     +-----------------------------------+
                     | AWS SNS                          |
                     | Email, SMS, push alerts          |
                     +-----------------------------------+
