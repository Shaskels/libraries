<template>
 <router-view />
</template>

<script>

export default {
  name: 'App',

}
</script>

<style>
body{
  padding: 0;
  margin: 0;
}

.error {
        color: #ff0000;
        text-align: center;
        margin-top: 0px;
        margin-bottom: 20px;
        height: 10px;
        font-size: 1em;
        font-weight: bold;
}

.logo{
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 0px;
    margin-top: 50px;
    width: 100px;
}
.register input, .login input, .add input{
    display: block;
    margin-bottom: 30px;
    margin-right: auto;
    margin-left: auto;
    padding: 10px 6px;
    width: 300px;
    box-sizing: bordre-box;
    border: none;
    border-bottom: 1px solid #ddd;
    color: #555;
}
.register button, .login button, .add button{
    background: #1a1818;
    border: 0;
    margin-top: 50px;
    padding: 10px 20px;
    color: white;
    width: 300px;
    border-radius: 20px;
    display: block;
    cursor: pointer;
    margin-left: auto;
    margin-right: auto;
}
.delete{
    background: #810505;
    border: 0;
    margin-top: 30px;
    padding: 10px 20px;
    color: white;
    width: 300px;
    border-radius: 20px;
    display: block;
    cursor: pointer;
    margin-left: auto;
    margin-right: auto;
}
</style>
