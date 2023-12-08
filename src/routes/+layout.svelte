<script>
	import '../app.postcss';
	import { initializeStores, Toast } from '@skeletonlabs/skeleton';


	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	initializeStores();
</script>

<slot />

<Toast />


