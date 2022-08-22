<template>
<div class="hero">
      <div class="col-6 col-lg-6">
        <h1 class="hero-title">Good food choices are good investments.</h1>
        <p class="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam, qui, distinctio voluptas minima vero ipsam in quo, esse modi nam corporis beatae dolore temporibus incidunt vitae ipsa maiores. Aspernatur, laboriosam.</p>
      </div>
      <div class="col-6 col-lg-6">
        <img src="@/assets/hero.jpg" class="hero-image img-fluid" alt="Hero Image">
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
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: black;
  color: rgb(129, 129, 129);
}

.hero-title{
  text-align: left;
  color: white;
}

.lead{
  text-align: justify;
}

.hero-image{
  margin: 0 0 0 10px;
  width: 525px;
  height: 350px;
}
</style>