# FxTwitter
This is a simple Discord bot that can be used to easily view Twitter embeds with video. Twitter has yet to fix this, and it remains a regular inconvenience.

## Acknowledgements
This is powered by https://fxtwitter.com. Check it out [here](https://github.com/robinuniverse/TwitFix).

## Usage
![image](https://user-images.githubusercontent.com/16168171/151690032-40799785-a7c6-41b6-a3ae-221a9ea75c4c.png)
To view a fixed Twitter embed, use the "Fix Twitter embed" context menu command by right clicking a message. This doesn't work on mobile yet thanks to Discord.

## Technology
This bot is built on [CloudFlare workers](https://developers.cloudflare.com/workers/), and runs entirely on HTTP-based interactions. This has no true bot account, and instead is entirely reliant upon an application. This means it has better privacy by default as it cannot read any messages on the server, but also means it has no ability to fix embeds on the fly.