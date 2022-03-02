<template>
  <h1 id="title">About Page!</h1>

  <p>
    So what is this site all about? <br />
    This site is a IDE
    <span class="italic gray">(if you wanna call it that)</span>
    for developing
    <a href="https://steamcommunity.com/app/365450/workshop/">Extensions</a>
    for <a href="https://store.steampowered.com/app/365450/Hacknet/">Hacknet</a>
  </p>
</template>

<style lang="sass" scoped>
#title
  text-align: center

p
  text-align: center

a
  text-decoration: none

  &:link
    color: primary

  &:visited
    color: primary

  &:hover
    color: secondary
    text-decoration: underline
    transition: 150ms linear

.italic
  font-style: italic

.gray
  color: gray
</style>
