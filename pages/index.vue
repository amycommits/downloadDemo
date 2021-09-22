<template>
  <div>
    <fieldset>
      <legend>
        Just a link
      </legend>
      <a :href="link" download>
        <img :src="link" width="400" height="500"/>
      </a>
    </fieldset>
    <fieldset>
      <legend>server served image</legend>
      <button @click="getImage">
         <img :src="link" width="400" height="500"/>
      </button>
    </fieldset>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      link: 'https://www.thesprucepets.com/thmb/KajBQBoVh7ufdWXMWubNwKqs_Y0=/5132x5132/smart/filters:no_upscale()/facts-about-black-cats-554102-hero-7281a22d75584d448290c359780c2ead.jpg'
    }
  },
  methods: {
    getImage () {
      const options = {
      method: 'POST',
      url: '/api/fetch-image',
      headers: {
        'content-type': 'application/json',
      },
      params: JSON.stringify({imgLink: this.link})
    }
    return axios.request(options).then((response) => {
      console.log({response})
      return response
    }).catch((error) => { return error })
    }
  }
}
</script>
