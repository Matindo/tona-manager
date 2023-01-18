<template>
  <div id="registration">
    <h3>Create Your Account</h3>
    <b-form @submit.prevent="register" @reset="resetForm" id="register" v-show="showForm">
      <b-label for="fname">First Name:</b-label>
      <b-input id="fname" v-model="user.fName" type="text" required placeholder="FIRST NAME"  />
      <b-label for="lname">Last Name:</b-label>
      <b-input id="lname" v-model="user.lName" type="text" required placeholder="LAST NAME" />
      <b-label for="email">Email:</b-label>
      <b-input id="email" v-model="user.email" type="email" required placeholder="EMAIL@EXAMPLE.COM" />
      <b-label for="org">Organization/School:</b-label>
      <b-input id="org" v-model="user.organization" type="text" required placeholder="ORGANIZATION/TEAM" />
      <b-label for="phone">Phone Number:</b-label>
      <b-input id="phone" v-model="user.phone" type="phone" required placeholder="+1-234-567-890" />
      <b-label for="new-password">Password:</b-label>
      <b-input id="new-password" v-model="user.password" type="password" required />
      <b-label for="confirm-password">Confirm Password:</b-label>
      <b-input id="confirm-password" v-model="confirmPassword" type="password" required :status="Boolean(confirmPassword === user.password)" />
      <div class="footer">
        <b-button pill variant="outline-primary" type="submit">REGISTER</b-button>
        <b-button pill variant="outline-secondary" type="reset">RESET</b-button>
      </div>
    </b-form>
    <br />
    <div class="confirnation">
      <p>Already have an account? <b-button variant="link" @click="$bvModal.show('loginModal')">Sign in here.</b-button></p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'RegisterView',
  data: function () {
    return {
      user: { fName: '', lName: '', email: '', phone: '', organization: '', password: '' },
      confirmPassword: '',
      showForm: true
    }
  },
  methods: {
    resetForm: function () {
      this.showForm = false
      this.$nextTick(() => {
        this.user = { fName: '', lName: '', email: '', phone: '', organization: '', password: '' }
      })
      this.showForm = true
    },
    register: function () {
      const formData = new FormData()
      formData.append('fname', this.user.fName)
      formData.append('lname', this.user.lName)
      formData.append('email', this.user.email)
      formData.append('phone', this.user.phone)
      formData.append('organization', this.user.organization)
      formData.append('pword', this.user.password)
      axios({
        method: 'POST',
        url: './api/User.php?action=create',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
        this.$bvToast.toast(`${res.data.message}`, {
          title: 'Success',
          autoHideDelay: 5000,
          appendToast: true
        }).then(() => {
          this.$router.push('/')
        })
      }).catch(err => {
        this.$bvToast.toast(`${err}`, {
          title: 'Error',
          autoHideDelay: 5000,
          appendToast: true
        })
      })
    }
  }
}
</script>

<style scoped>
#registration {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  margin: 2em 4em;
  padding: 5em;
  color: hsl(0 1% 14%);
  background-color: hsl(60 56% 91% / .75);
  backdrop-filter: blur(4px);
  box-shadow: 0 0 .5rem .2rem hsl(0 0% 0% / .47);
  border: 1px solid rgba( 255, 255, 255, 0.18 );
  border-radius: 1em;
  overflow: hidden;
}
#register {
  margin-inline: auto;
  margin-block-start: 1rem;
  margin-block-end: 1.5rem;
  display: grid;
  grid-template-columns: min(42rem, 1fr);
  gap: clamp(.2rem, .2rem, 1.2rem);
  width: min(45rem, 50dvw);
  text-align: start;
}
input {
  border: 0;
  padding-inline: .7em;
  border-radius: 3px;
  color: hsl(240, 70%, 33%);
  background: hsl(60 56% 95% / .75);
}
input:disabled {
  color: hsl(0, 0%, 0%) !important;
  background: transparent;
}
form button {
  width: min(50%, 15rem);
  margin-inline: auto;
}
.footer{
  margin-block: .5rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}
</style>
