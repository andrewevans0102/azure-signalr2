# azure-signalr2

This is the sample project for my post [Connecting Microsoft SignalR with Angular](https://rhythmandbinary.com/post/2020-10-16-connecting-microsoft-signalr-with-angular).

This project connects the Azure SingalR Service to an Angular application.

In the `azure` folder there are two functions defined:

1. `negotiate` which handles the initial SignalR handshake
2. `messages` which handles actually transmitting messages via SignalR

In order to run this locally with an instance of Azure SignalR you need to add your Azure Functions base URL to the environment variable in `/src/environments/environment`:

```js
export const environment = {
  production: false,
  azureConnection: "<AZURE_CONNECTION>",
};
```

If you want to run the functions locally, you'll also need to include your `AzureSignalRConnectionString` in the file `/azure/local.settings.json` like so:

```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureSignalRConnectionString": "<CONNECTION_STRING_LOCAL_HOST>",
    "FUNCTIONS_WORKER_RUNTIME": "node"
  },
  "Host": {
    "LocalHttpPort": 7071,
    "CORS": "*",
    "CORSCredentials": false
  }
}
```

Feel free to follow me on [andrewevans.dev](https://www.andrewevans.dev) and on Twitter at [@AndrewEvans0102](https://www.twitter.com/andrewevans0102).
