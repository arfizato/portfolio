<script lang="ts">
	import { enhance } from '$app/forms';
	import Footer from '$lib/components/Footer.svelte';
	import ContactItem from '$lib/components/ContactItem.svelte';
	import SocialLink from '$lib/components/SocialLink.svelte';

	let { form } = $props();
	let submitting = $state(false);
</script>

<svelte:head>
	<title>Contact | Emna — Data Analyst</title>
</svelte:head>

<main class="relative min-h-screen overflow-hidden">
	<!-- Atmospheric Background -->
	<div class="sky-gradient absolute top-0 left-0 -z-10 h-[614px] w-full opacity-20 blur-3xl">
	</div>
	<div
		class="absolute -bottom-24 -right-24 -z-10 h-96 w-96 rounded-full bg-secondary-container opacity-30 blur-3xl"
	></div>

	<div class="mx-auto max-w-[1440px] px-12 py-20 pt-32 lg:py-32 lg:pt-40">
		<!-- Header -->
		<header class="mb-20 max-w-2xl text-center md:text-left">
			<h1
				class="mb-6 font-headline text-6xl tracking-tight text-on-surface md:text-7xl lg:text-8xl"
			>
				Reach Out
			</h1>
			<p class="font-body text-lg leading-relaxed text-on-surface-variant md:text-xl">
				A collaborative space where inquiry meets data. Whether you have a scholarly inquiry
				or a creative vision, I invite you to share your thoughts.
			</p>
		</header>

		<div class="grid grid-cols-1 items-start gap-16 lg:grid-cols-12">
			<!-- Contact Form -->
			<div class="lg:col-span-7">
				<div
					class="journal-shadow relative overflow-hidden rounded-xl bg-surface-container-lowest p-8 md:p-12"
				>
					<!-- Decorative corner gradient -->
					<div
						class="sky-gradient absolute top-0 right-0 h-32 w-32 rounded-bl-full opacity-5"
					></div>
					<form
						class="relative z-10 space-y-8"
						method="POST"
						use:enhance={() => {
							submitting = true;
							return async ({ update }) => {
								await update();
								submitting = false;
							};
						}}
					>
						<div class="grid grid-cols-1 gap-8 md:grid-cols-2">
							<div class="space-y-2">
								<label
									class="font-body text-sm font-semibold tracking-widest text-on-surface opacity-70 uppercase"
									for="name">Name</label
								>
								<input
									class="w-full rounded-lg border-none bg-surface-container-low p-4 text-on-surface outline-none transition-all duration-300 placeholder:opacity-30 focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container"
									id="name"
									name="name"
									type="text"
									placeholder="Emilia Noels"
									value={form?.name ?? ''}
									required
								/>
							</div>
							<div class="space-y-2">
								<label
									class="font-body text-sm font-semibold tracking-widest text-on-surface opacity-70 uppercase"
									for="email">Email</label
								>
								<input
									class="w-full rounded-lg border-none bg-surface-container-low p-4 text-on-surface outline-none transition-all duration-300 placeholder:opacity-30 focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container"
									id="email"
									name="email"
									type="email"
									placeholder="hello@dataartistry.edu"
									value={form?.email ?? ''}
									required
								/>
							</div>
						</div>
						<div class="space-y-2">
							<label
								class="font-body text-sm font-semibold tracking-widest text-on-surface opacity-70 uppercase"
								for="message">Message</label
							>
							<textarea
								class="w-full resize-none rounded-lg border-none bg-surface-container-low p-4 text-on-surface outline-none transition-all duration-300 placeholder:opacity-30 focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container"
								id="message"
								name="message"
								rows="6"
								placeholder="Share your inquiry or data narrative..."
								required
							>{form?.message ?? ''}</textarea>
						</div>
						{#if form?.error}
							<p class="rounded-lg bg-error-container px-4 py-3 font-body text-sm text-on-error-container">
								{form.error}
							</p>
						{/if}
						{#if form?.success}
							<p class="rounded-lg bg-primary-container px-4 py-3 font-body text-sm text-on-primary-container">
								Thank you! Your message has been sent.
							</p>
						{/if}
						<button
							class="w-full rounded-full bg-gradient-to-r from-primary to-primary-dim px-10 py-4 font-body text-sm font-bold tracking-widest text-on-primary uppercase transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 active:scale-95 disabled:opacity-50 md:w-auto"
							type="submit"
							disabled={submitting}
						>
							{submitting ? 'Sending...' : 'Send Inquiry'}
						</button>
					</form>
				</div>
			</div>

			<!-- Sidebar -->
			<aside class="space-y-12 lg:col-span-5 lg:pl-12">
				<section>
					<h3 class="mb-8 font-headline text-3xl text-on-surface">
						Other Ways to Connect
					</h3>
					<div class="space-y-6">
						<ContactItem
							icon="mail"
							label="Inquiries"
							value="emna@datajournal.io"
							color="secondary"
						/>
						<ContactItem
							icon="location_on"
							label="Studio"
							value="Amsterdam, Netherlands"
							color="primary"
						/>
					</div>
				</section>

				<section class="space-y-6">
					<h4
						class="px-4 font-label text-xs font-bold tracking-widest text-on-surface-variant uppercase"
					>
						Scholarly Networks
					</h4>
					<div class="grid grid-cols-1 gap-4">
						<SocialLink name="LinkedIn" />
						<SocialLink name="GitHub" />
						<SocialLink name="ResearchGate" />
					</div>
				</section>

				<!-- Decorative Image -->
				<div class="relative mt-8 aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl">
					<img
						class="h-full w-full object-cover grayscale-[20%] sepia-[10%] brightness-105"
						alt="Minimal aesthetic workspace with soft morning light, a delicate vase of flowers, and a notebook on a white marble desk"
						src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPjlCN42nSp8Ksy7ceBNFdBHt1eASoWSroeFbjPan2HM6y_b9uNLOFrVCwdovjsKRYMRqVKsVZm15zQt-RfAKJU7b85B4EM6ZStsCyc-SdK0oTeS1WVw7L2vmQEHXi-gNZ-v9PkuiqKIhzXoU4kUWgvhZWNh88a8IHKFLN9JIgTUlwlHirMpJSne-dCGkoEZ2lCRvxLvYnV3-bZGNP-8r9y4LMXIiB8UooBPFRPBeTPnCO1859TJEjRY0UqcfckzrOjEMA7Uv4wHw"
					/>
					<div
						class="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"
					></div>
				</div>
			</aside>
		</div>
	</div>
</main>

<Footer variant="simple" />
