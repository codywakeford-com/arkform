<template>
    <ClientOnly>
        <Teleport to=".VPHero > .container">
            <div class="within-hero__slot-container">
                <slot />
            </div>
        </Teleport>
    </ClientOnly>
</template>

<style lang="scss">
.within-hero__slot-container {
    order: 2;
    width: 100%;
}

.VPHero > .container > .main {
    width: fit-content;
    max-width: 475px;
    flex-grow: 0;
}

.VPHero > .container {
    gap: 75px !important;
}

.VPHero > .container {
    gap: 32px;
}

@media (min-width: 960px) {
    .VPHero > .container {
        gap: 64px;
    }
}
</style>
