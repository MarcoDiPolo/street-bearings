# Replay the LEAF scenarios

The main project opens with both interaction packages already present. This test bundle adds the automated visitor only to a separate copy of the project.

1. Make a second checkout for tests. Use Lens Studio 5.23.2 build 26081320 with the LEAF editor plugin 5.23.0. Keep Spectacles Interaction Kit and Spectacles UI Kit at 2.0.0.
2. Use the Lens Studio Asset Library to import **Leaf 2.0.2** into that checkout as `Packages/Leaf.lspkg`. Select the version explicitly. Also install the transitive **Bitmoji 3D 10.0.1** component when prompted. The normal route and history card do not use avatars. [Asset Library](https://docs.lensstudio.com/develop/foundation/asset-library/asset-library-overview) · [Bitmoji component](https://docs.lensstudio.com/develop/foundation/asset-library/bitmoji-3d)
3. Close the test project. Copy this folder’s `Assets/LEAF` directory, including all its `.meta` files, into the test checkout’s `Assets`. Copy `Scene.with-tests.scene` over its `Assets/Scene.scene`. Keep the existing `Assets/Scene.scene.meta`. This registers the six scenarios with the original scene IDs.
4. Reopen that checkout, allow the official LEAF editor plugin to load, and start the SPECS preview. Ask CLAD to run each scenario listed in `Assets/LEAF/LeafIndex.ts` using `run_leaf_scenario` on the preview. The first five IDs correspond to the brief. The sixth exercises the simulated right arm.

The tested `Leaf.lspkg` archive has SHA-256 `42bc195d4b50c818f41d91b91483344001d90b385e66551063ddce018f03db0b`. LEAF 4.0.0 expects a newer Lens Studio and a differently named interaction package. [Recorded run](../../devpost/evidence/leaf-results.json)
