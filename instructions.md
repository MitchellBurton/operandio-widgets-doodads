Technical Exercise

We’d like you to complete a short technical exercise to give us insight into your coding style and architectural approach. The task is to build a basic API server that supports the following actions:

Create, list, retrieve (detail) and update Widgets and Doodads.


Data Models (minimum)

Widget
name (string)
description (string)
image (string – assume a URL or image reference)
Doodad
name (string)
description (string)
image (string – assume a URL or image reference)
price (number)


Guidelines

Please implement only the create, list, detail (retrieve), and update endpoints for each model.
The tech stack is entirely your choice—use whatever you'd be comfortable using in production.
Storage can be in-memory (e.g., simple data structures or mock DB), though you’re welcome to use a lightweight database if preferred.
Your solution should represent production-ready code—we're looking for clarity, maintainability, and scalability in your implementation.
We estimate this exercise should take around 4 hours.


To keep this focused, you can ignore the following:

Writing automated tests – no need to write unit or integration tests for this exercise.
Authentication and authorization – no need to implement login systems, tokens, or role-based access control.
Image handling – treat the image field as a simple string; you don’t need to support uploads or serve actual image files.
Delete action - no need to write the delete action for Widgets and Doodads.


Once you’ve completed the exercise, please share your solution with us via a GitHub repository or another method of your choice, and then book a follow-up call using the link below so we can review and discuss your work: