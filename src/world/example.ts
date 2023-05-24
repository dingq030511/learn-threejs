import { World } from '.';
async function main() {
  const world = new World(document.body);
  // await world.init();
  world.start();
}

main().catch(e=>{
  console.error(e);
})