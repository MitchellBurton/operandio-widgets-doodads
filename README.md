# Widget and Doodad API

This project is a simple RESTful API built with Node.js and Express.js, designed to manage widgets and doodads.
It provides endpoints for creating, listing, retrieving, and updating widgets and doodads.
It also includes OpenAPI documentation for the API endpoints, generated using tsoa.

This project uses:
- **Node**: For server-side JavaScript runtime.
- **Express**: For building the web application framework.
- **tsoa**: For TypeScript based OpenAPI document generation. See: https://tsoa-community.github.io/docs/
- **Biome**: For linting and formatting. See: https://biomejs.dev/


## Project Structure

The project is organized as follows:
- **/src**: Contains the main application source code.
	- **/widgets**: Contains the widget domain related controller, models, and repository.
	- **/doodads**: Contains the doodad domain related controller, models, and repository.
	- **/lib**: Contains express middleware and utility types.
	- **app.ts**: Main application entry point.
- **/dist**: Contains the compiled JavaScript code after running the build process.
- **/generated**: Contains the generated OpenAPI documentation and TypeScript express route definitions.

## Getting Started
To get started with the project, follow these steps:
1. Clone the repository:
   ```bash
   git clone https://github.com/MitchellBurton/operandio-widgets-doodads.git
   cd widget-and-doodad-api
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```
* The API is available at `http://localhost:9000`.
* You can also access the OpenAPI documentation at `http://localhost:9000/docs`.

This project uses Biome for linting and formatting. To run the linter and formatter:
   ```bash
   npm run check
   ```

## Deployment
This projects does not include deployment. However, it would be easy to wrap this in a Docker container and deploy to a docker host.

Alternatively, you could deploy this to a cloud provider such as AWS, Azure, or GCP using their respective services for hosting Node.js applications.

Or with some minor changes, you could deploy this to a serverless platform such as AWS Lambda or Azure Functions.

### Building for production
To build the project for production, run:
```bash
npm run build
```
This will compile the TypeScript code into JavaScript and place it in the `dist` directory.