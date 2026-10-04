# Matthew Trent reference

Inspected 2026-10-04. Source: https://matthewtrent.me/.

## Experience interaction

- Text-first collapsible rows with company, muted role, dotted leader, and date. Small screens stack text and remove the leader.
- His expansion animates measured panel height over 300ms. Grid panel starts at `0fr`; inner content uses `min-height: 0` and clips overflow. Reduced motion opens immediately.
- Our version keeps at most one row open; opening another closes the previous row, and toggling the open row closes it. It uses 450ms CSS grid height transitions with smooth acceleration and deceleration, subtle opacity/vertical reveal, and a plus rotating to a cross. No solid row borders or row translation.
- His icon reveal staggers opacity/horizontal motion at 55ms intervals. Our version starts after the 450ms panel expansion, then reveals icons left-to-right at 70ms intervals, fading from 0 to 1 and sliding from a 0.75rem right offset to rest over 550ms. Closing fades the icons out over 200ms without stagger delays. Every opening replays the reveal; reduced motion and keyboard focus bypass the animation.

## Technology icons

- Local SVG brand assets under `https://matthewtrent.me/media/tech/<id>.svg`.
- Small variant is 12px square; normal variant is 14px. `object-fit: contain`, async decoding, no dragging, default eager loading. Each icon has a labeled tooltip; the image itself has empty alt text.
- Locally saved in `src/assets/icons/tech/`: `aws.svg`, `next.svg`, `postgres.svg`. These are unchanged brand artwork, not UI color tokens. Our experience rows now use 14px icon-only transparent PNGs with technology names in compact custom tooltips above each icon on hover/focus and accessible names.
- Java and Spring assets could not be fetched from Matthew’s site. Our production technology icons now come from Devicon.
- Inventory below comes from his technology label mapping. It records source filenames; it does not claim all files are downloaded or available.

| Technology | Source filename |
| --- | --- |
| Actix | `actix.svg` |
| AWS | `aws.svg` |
| Shell | `bash.svg` |
| C | `c.svg` |
| CMake | `cmake.svg` |
| C++ | `cpp.svg` |
| C# | `csharp.svg` |
| CSS | `css.svg` |
| Dart | `dart.svg` |
| Django | `django.svg` |
| Docker | `docker.svg` |
| Firebase | `firebase.svg` |
| Figma | `figma.svg` |
| Flutter | `flutter.svg` |
| GCC | `gcc.svg` |
| GCP | `gcp.svg` |
| Git | `git.svg` |
| Go | `go.svg` |
| GraphQL | `graphql.svg` |
| Heroku | `heroku.svg` |
| Homebrew | `homebrew.svg` |
| HTML | `html.svg` |
| IPFS | `ipfs.svg` |
| Java | `java.svg` |
| JavaScript | `javascript.svg` |
| JSON | `json.svg` |
| Jupyter | `jupyter.svg` |
| Kafka | `kafka.svg` |
| Kotlin | `kotlin.svg` |
| libp2p | `libp2p.svg` |
| Liquid | `liquid.svg` |
| Lua | `lua.svg` |
| Mapbox | `mapbox.svg` |
| Markdown | `markdown.svg` |
| Matplotlib | `matplotlib.svg` |
| MongoDB | `mongodb.svg` |
| MySQL | `mysql.svg` |
| Next.js | `next.svg` |
| Nginx | `nginx.svg` |
| Node.js | `node.svg` |
| npm | `npm.svg` |
| NumPy | `numpy.svg` |
| PostgreSQL | `postgres.svg` |
| Python | `python.svg` |
| R | `r.svg` |
| Raspberry Pi | `raspberrypi.svg` |
| React | `react.svg` |
| Redis | `redis.svg` |
| Redux | `redux.svg` |
| Ruby | `ruby.svg` |
| Rust | `rust.svg` |
| Selenium | `selenium.svg` |
| SQLite | `sqlite.svg` |
| Stripe | `stripe.svg` |
| Svelte | `svelte.svg` |
| SVG | `svg.svg` |
| Swift | `swift.svg` |
| Tailwind | `tailwind.svg` |
| TensorFlow | `tensorflow.svg` |
| TypeScript | `typescript.svg` |
| Unity | `unity.svg` |
| Vite | `vite.svg` |
| Vue | `vue.svg` |
| Weaviate | `weaviate.svg` |
| Webpack | `webpack.svg` |
| Zig | `zig.svg` |

## Production PNG technology assets

Source: https://github.com/devicons/devicon (MIT; source license saved as `src/assets/icons/tech/DEVICON-LICENSE.txt`). Original brand SVGs rasterized to 96px transparent RGBA PNGs with 4px padding, preserving brand artwork. The site displays them at 14px. Oracle and Docker now use the user-supplied PNG marks; the other assets include dark GitHub/Next.js marks suitable for the light background. Shell uses the Bash logo.

Technology icons are no longer rendered in experience dropdowns; assets and inventories remain saved for reference. The exact per-company lists live in `src/pages/Home.tsx`; `src/pages/Home/technologyIcons.ts` maps technology labels to local PNG imports. AT&T, Auburn, and Adtran all include Docker. Keep the same relative order across rows: languages, frameworks, databases, cloud, then tools (Docker, Postman, Shell, GitHub). No technology lists for IS4S or Epic Games.

| Local PNG | Devicon source |
| --- | --- |
| `java.png` | `icons/java/java-original.svg` |
| `python.png` | `icons/python/python-original.svg` |
| `typescript.png` | `icons/typescript/typescript-original.svg` |
| `spring.png` | `icons/spring/spring-original.svg` |
| `angular.png` | `icons/angular/angular-original.svg` |
| `oracle.png` | `icons/oracle/oracle-original.svg` |
| `azure.png` | `icons/azure/azure-original.svg` |
| `mongodb.png` | `icons/mongodb/mongodb-original.svg` |
| `docker.png` | `icons/docker/docker-original.svg` |
| `shell.png` | `icons/bash/bash-original.svg` |
| `github.png` | `icons/github/github-original.svg` |
| `fastapi.png` | `icons/fastapi/fastapi-original.svg` |
| `next.png` | `icons/nextjs/nextjs-original.svg` |
| `supabase.png` | `icons/supabase/supabase-original.svg` |
| `aws.png` | `icons/amazonwebservices/amazonwebservices-original-wordmark.svg` |
| `postman.png` | `icons/postman/postman-original.svg` |
