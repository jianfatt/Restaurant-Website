<template>
<div class="hero row">
      <div class="col-lg-6">
        <h1 class="header">Responsive left-aligned hero with image</h1>
        <p class="lead">Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.</p>
      </div>
      <div class="col-10 col-sm-8 col-lg-6">
        <img src="#" class="image" alt="Bootstrap Themes">
      </div>
    </div>
</template>

<script>
export default {
  name: 'hero',
}
</script>

<style>
.hero{
  display: flex;
  align-items: center;
  padding: 30px 0;
}
</style>