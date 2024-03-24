# Photo Gallery

My project is a web application that allows users to search for and view photos.

## Getting Started

To get started, you will need to have the following installed:

- [.NET 6 SDK](https://dotnet.microsoft.com/download/dotnet/6.0)
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

## Installation

1. Install dependencies:
   - Backend: Open the `CleanGallery` folder and run `dotnet restore`.
   - Client: Open the `ClientApp` folder and run `npm install`.
2. Build the project:
   - Backend: Run `dotnet build` in the `CleanGallery` folder.
   - Client: Run `npm run build` in the `ClientApp` folder, This will create a dist folder in the root directory.
   - This will create a dist folder in the root directory of your app.
   - Copy the contents of the dist folder to the appropriate location on your server.

## Usage

1. Start the backend server:
   - Run `dotnet run` in the `CleanGallery/App` folder.
2. Start the client app:
   - Configure your web server to serve the files in the dist folder. The exact steps for doing this will depend on your web server and hosting environment.
   - One possible solution to do this is with `npm install -g http-server`.
   - `cd /clientApp/dist`.
   - Start the server by running the following command: `http-server`.
   - To change the port, you can specify an option like: `http-server -p 8080`.
3. Open a web browser and navigate to `http://192.168.0.104:8080` if you are using npm http-server.

## Configuration

- Backend:
  - The `appsettings.json` file in the `CleanGallery` folder contains the following settings:
    - `AllowedOrigins`: A comma-separated list of origins that are allowed to make requests to the API. (Make sure your to add your the ip/dns where you run the clientapp here).
    - `ExternalApiSettings`: Please enter your FlickrApiKey here.
- Client:
  - The `src/constants.ts` file in the `ClientApp` folder contains the following settings:
    - `API_URL`: The base URL of the backend API. If you are changing the backend address, make sure to change the `API_URL`.
  - To modify the settings, edit the `src/config.ts` file.

## Swagger Definition

The backend server includes a Swagger definition that describes the API endpoints and models. To view the Swagger UI, navigate to `http://localhost:7019/swagger` in your web browser after starting the backend server. The Swagger UI allows you to explore the API and test the endpoints.

## Suggestion of improvement

- Instead of hardcoding the `API_URL` in the client app, consider passing it as an environment variable or fetching it from a configuration file. This will make it easier to switch between different environments (e.g., development, staging, production) without having to modify the code.
- Consider adding authentication and authorization to the backend API to ensure that only authenticated users can access certain endpoints and perform certain actions.
- Write more tests, especially frontend tests.
- Remove some hardcoded strings in backend.
- Refactor appSettings.
- Handle the photos in frontend in a more responsive way.
- Cleaner error handling frontend (quite poor right now).
- Precache pages in backend.

## Technology Choices

This project was built using the following technologies:

### Backend:

- .NET 6
- ASP.NET Core
- MediatR
- AutoMapper
- Swagger

I chose .NET 6 and ASP.NET Core for the backend because of its performance, security, scalability, and the fact that .NET 6 is LTS. However, I may consider trying out .NET 7 or 8 in the future. MediatR was used for implementing the CQRS pattern, while AutoMapper (which may be unnecessary for now) was used for object mapping. Swagger was also used to provide API documentation.

For the backend architecture, I attempted to implement clean architecture, but it's new to me, so I did my best. There are probably a lot of pitfalls, but it was a fun learning experience.

### Frontend:

- TypeScript
- Vite as build tool.

For the frontend, I used TypeScript because it was required for this assignment. I also used Vite as a fast build tool for modern web apps, I can highly recommend it.
