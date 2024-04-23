![Trim URL homepage](/public/preview.png)

# Trim URL
Minimal link-shortening website built using NextJs and Shadcn/UI.

### Features
1. Creates unique short URLs.
2. Redirect to the original URL.
3. Saves generated URLs in local storage.
4. A table showing the list of generated URLs saved in local storage.
5. URLs can be edited, deleted, or copied to the clipboard.

### Tech Stack 
- Next.js
- TypeScript
- Tailwind CSS
- Shadcn/UI
- Mongoose
- MongoDB
  
### Getting Started

Add the following environment variables

```ini
# .env
MONGODB_URI=mongodb+srv://...
```

Install the dependencies and start the dev server.

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


### License
This project is licensed under the MIT License.

