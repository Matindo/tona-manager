<template>
  <div id="account-page">
    <div id="avi">
      <div class="dpic">
        <b-avatar button src="https://placekitten.com/300/300" size="8em"></b-avatar>
        <b-avatar button icon="pencil" variant="light" id="editor" size="2em" @click="$bvModal.show('dpicModal')"></b-avatar>
      </div>
      <div class="username">
        <h4>My Account</h4>
      </div>
      <hr>
    </div>
    <div id="dashboard">
      <div id="details">
        <h5>Account Details</h5>
        <b-form @submit.prevent="saveChanges" id="user-details">
          <b-input v-model="user.fName" type="text" required placeholder="FIRST NAME" :disabled="!editMode" />
          <b-input v-model="user.lName" type="text" required placeholder="LAST NAME" :disabled="!editMode" />
          <b-input v-model="user.email" type="email" required placeholder="EMAIL@EXAMPLE.COM" :disabled="!editMode" />
          <b-input v-model="user.organization" type="text" required placeholder="ORGANIZATION/TEAM" :disabled="!editMode" />
          <b-input v-model="user.phone" type="phone" required placeholder="+1-234-567-890" :disabled="!editMode" />
          <b-button pill variant="outline-primary" type="submit" v-show="editMode">SAVE CHANGES</b-button>
        </b-form>
        <h5>Update Password</h5>
        <b-form @submit.prevent="changePassword" id="user-password">
          <b-label for="current-password">Current Password:</b-label>
          <b-input id="current-password" v-model="password.current" type="password" required autocomplete />
          <b-label for="new-password">New Password:</b-label>
          <b-input id="new-password" v-model="password.new" type="password" required />
          <b-label for="confirm-password">Confirm New Password:</b-label>
          <b-input idr="confirm-password" v-model="password.confirm" type="password" required :status="Boolean(password.confirm === password.new)" />
          <b-button pill variant="outline-dark" type="submit">SAVE PASSWORD</b-button>
        </b-form>
      </div>
      <div id="admin_pane">
        <h5>Admin Panel</h5>
        <h6 class="w-100">Role: <span id="role">{{ user.role }}</span></h6>
        <div class="debates">
          <h6>Associated Tournaments:
            <b-button variant="outline-light" size="sm" class="m-2" @click="$router.push({ name: 'tournament', params: { debate } })">Debate</b-button>
          </h6>
        </div>
        <b-button variant="outline-info" @click="editMode = !editMode">Edit Account Information</b-button>
        <br />
        <b-button variant="danger" @click="deleteAccount">Delete Account Permanently</b-button>
      </div>
    </div>
    <b-modal centered id="dpicModal" hide-footer hide-header>
      <h3 style="text-align: center;">Change Your Profile Picture</h3>
      <b-form id="dpic-form" @submit.prevent="switchPicture">
        <div class="preview">
          <div class="old">
            <b-avatar src="https://placekitten.com/300/300" size="8em" rounded></b-avatar>
            <p>CURRENT PICTURE</p>
          </div>
          <div class="new">
            <b-avatar src="https://placekitten.com/300/300" size="8em" rounded></b-avatar>
            <p>NEW PICTURE</p>
          </div>
        </div>
        <b-form-fieldset label="File:">
          <b-form-file accept="image/*" v-model="newDpic" placeholder="Select or drop an image file" required />
        </b-form-fieldset>
        <div class="form-footer">
          <b-button variant="outline-primary" pill size="sm" type="submit">UPLOAD IMAGE</b-button>
          <b-button variant="outline-secondary" pill size="sm" @click="$bvModal.hide('dpicModal')">CANCEL</b-button>
        </div>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
  name: 'AccountView',
  computed: {
    ...mapGetters({
      user: 'USER'
    })
  },
  data: function () {
    return {
      password: { current: '', new: '', confirm: '' },
      editMode: false,
      newDpic: null
    }
  },
  methods: {
    switchPicture: function () {
      const formData = new FormData()
      formData.append('id', this.user.id)
      formData.append('dpic', this.newDpic)
      axios({
        method: 'POST',
        url: './api/User.php?action=changePicture',
        data: formData,
        headers: { 'Content-Type': 'multi-part/formdata' }
      }).then(res => {
        this.$bvToast.toast(`${res.data.message}`, {
          title: 'Success',
          autoHideDelay: 5000,
          appendToast: true
        })
      })
    },
    saveChanges: function () {
      const formData = new FormData()
      formData.append('fname', this.user.fName)
      formData.append('lname', this.user.lName)
      formData.append('email', this.user.email)
      formData.append('phone', this.user.phone)
      formData.append('organization', this.user.organization)
      formData.append('id', this.user.id)
      axios({
        method: 'POST',
        url: './api/User.php?action=update',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
        this.$bvToast.toast(`${res.data.message}`, {
          title: 'Success',
          autoHideDelay: 5000,
          appendToast: true
        })
      }).catch(err => {
        this.$bvToast.toast(`${err}`, {
          title: 'Error',
          autoHideDelay: 5000,
          appendToast: true
        })
      })
    },
    changePassword: function () {
      const formData = new FormData()
      formData.append('id', this.user.id)
      formData.append('oldPassword', this.password.current)
      formData.append('newPassword', this.password.new)
      axios({
        method: 'POST',
        url: './api/User.php?action=changePassword',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
        this.$bvToast.toast(`${res.data.message}`, {
          title: 'Success',
          autoHideDelay: 5000,
          appendToast: true
        })
      }).catch(err => {
        this.$bvToast.toast(`${err}`, {
          title: 'Error',
          autoHideDelay: 5000,
          appendToast: true
        })
      })
    },
    deleteAccount: function () {
      this.$bvModal.msgBoxConfirm('ARE YOU SURE YOU WANT TO PERMANENTLY DELETE YOUR ACCOUNT?', {
        title: 'Confirm Deletion',
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'danger',
        okTitle: 'YES',
        cancelTitle: 'NO',
        footerClass: 'p-1 m-auto',
        hideHeaderClose: false,
        centered: true
      }).then(value => {
        if (value) {
          const formData = new FormData()
          formData.append('id', this.user.id)
          axios({
            method: 'POST',
            url: './api/User.php?action=delete',
            data: formData,
            headers: { 'Content-Type': 'multi-part/formdata' }
          }).then(res => {
            this.$bvToast.toast(`${res.data.message}`, {
              title: 'Success',
              autoHideDelay: 5000,
              appendToast: true
            }).then(() => {
              this.$router.push('/')
            })
          })
        }
      }).catch(err => {
        this.$bvToast.toast(`Could not delete account: ${err}`, {
          title: 'Error',
          autoHideDelay: 5000,
          appendToast: true
        })
      })
    },
    formatNames: function (files) {
      return files.length === 1 ? files[0].name : `${files.length} files selected`
    }
  }
}
</script>

<style scoped>
#account-page {
  display: flex;
  flex-direction: column;
  margin: min(2%, 1.5em) min(4%, 3em);
  padding: 2em;
  color: hsl(0 1% 14%);
  background-color: hsl(60 56% 91% / .75);
  backdrop-filter: blur(4px);
  box-shadow: 0 0 .5rem .2rem hsl(0 0% 0% / .47);
  border: 1px solid rgba( 255, 255, 255, 0.18 );
  border-radius: 1em;
  overflow: hidden;
}
#avi {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-inline: auto;
  margin-bottom: 1rem;
}
.dpic {
  position: relative;
  margin-inline: auto;
  margin-block: 1rem;
}
.dpic #editor {
  position: absolute;
  bottom: 0;
  right: 7%;
  outline: 1px grey;
  transition: all .2s ease;
}
.dpic #editor:hover {
  color: white;
  outline: none;
  background-color: black;
  cursor: pointer;
}
.username {
  margin-inline: auto;
}
#dashboard {
  width: 80%;
  height: min-content;
  margin-inline: auto;
  display: grid;
  grid-template-columns: 40rem auto;
  gap: .5em;
  grid-auto-flow: row;
  align-items: baseline;
}
#details, #admin_pane {
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  justify-content: center;
  text-align: start;
  padding: 1rem;
}
form {
  display: grid;
  grid-auto-columns: repeat(autofit, min(35rem, 100%));
  gap: .5rem;
  margin-block-end: 2rem;
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
form > button {
  width: 50%;
  margin-inline: auto;
}
.preview {
  margin-inline: 1rem;
  padding-inline: 1em;
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: space-around;
}
.preview > * {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
</style>
