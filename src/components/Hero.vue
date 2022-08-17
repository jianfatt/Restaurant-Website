<template>
<div class="hero row">
      <div class="col-lg-6">
        <h1 class="header">Good food choices are good investments.</h1>
        <p class="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam, qui, distinctio voluptas minima vero ipsam in quo, esse modi nam corporis beatae dolore temporibus incidunt vitae ipsa maiores. Aspernatur, laboriosam.</p>
      </div>
      <div class="col-10 col-sm-8 col-lg-6">
        <img src="@/assets/hero.jpg" class="hero-image" alt="Hero Image">
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
  text-align: left;
  background: black;
  padding: 0 100px;
  color: rgb(129, 129, 129);
}

.hero-image{
  width: 570px;
  height: 350px;
}
</style>