<template>
  <b-container fluid class="">
    <!--<spinner v-show="communicating" message="Komunikacja z bazą danych..."></spinner>-->
    <b-row>
      <b-col>
        <b-form @submit="submitLogin" class="login-form">
          <b-form-group id="loginNameGroup">
            <b-form-input id="loginName"
                          type="text"
                          v-model="loginForm.username"
                          :state="!$v.loginForm.username.$invalid"
                          aria-describedby="nameLoginFeedback"
                          placeholder="Wprowadź login" />
            <b-form-invalid-feedback id="nameLoginFeedback">
              To pole jest wymagane
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group id="loginPasswordGroup">
            <b-form-input id="loginPasswordInput"
                          type="password"
                          v-model="loginForm.password"
                          :state="!$v.loginForm.password.$invalid"
                          aria-describedby="passwordLoginFeedback"
                          placeholder="Wprowadź hasło"/>
            <b-form-invalid-feedback id="passwordLoginFeedback">
              To pole jest wymagane
            </b-form-invalid-feedback>
          </b-form-group>
          <b-button type="submit"
                    variant="primary"
                    :disabled="$v.loginForm.$invalid">
            Logowanie
          </b-button>
        </b-form>
      </b-col>
      <!--LOGIN-->
      <!------------------------------------------------------------------->
      <!--REGISTER-->
      <b-col>
        <b-form @submit="submitRegister" class="login-form">
          <b-form-group id="registerNameGroup">
            <b-form-input id="registerName"
                          type="text"
                          v-model="registerForm.username"
                          :state="!$v.registerForm.username.$invalid"
                          aria-describedby="nameRegisterFeedback"
                          placeholder="Wprowadź login" />
            <b-form-invalid-feedback id="nameRegisterFeedback">
              To pole jest wymagane
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group id="registerFirstNameGroup">
            <b-form-input id="registerFirstName"
                          type="text"
                          v-model="registerForm.firstName"
                          :state="!$v.registerForm.firstName.$invalid"
                          aria-describedby="firstNameRegisterFeedback"
                          placeholder="Wprowadź imię" />
            <b-form-invalid-feedback id="firstNameRegisterFeedback">
              To pole jest wymagane
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group id="registerLastNameGroup">
            <b-form-input id="registerLastName"
                          type="text"
                          v-model="registerForm.lastName"
                          :state="!$v.registerForm.lastName.$invalid"
                          aria-describedby="lastNameRegisterFeedback"
                          placeholder="Wprowadź nazwisko" />
            <b-form-invalid-feedback id="lastNameRegisterFeedback">
              To pole jest wymagane
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group id="registerPasswordGroup">
            <b-form-input id="registerPasswordInput"
                          type="password"
                          v-model="registerForm.password"
                          :state="!$v.registerForm.password.$invalid"
                          aria-describedby="passwordRegisterFeedback"
                          placeholder="Wprowadź hasło"/>
            <b-form-invalid-feedback id="passwordRegisterFeedback">
              To pole jest wymagane
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group id="registerPasswordRepeatGroup">
            <b-form-input id="registerPasswordRepeatInput"
                          type="password"
                          v-model="registerForm.passwordRepeat"
                          :state="!$v.registerForm.passwordRepeat.$invalid"
                          aria-describedby="passwordRepeatRegisterFeedback"
                          placeholder="Powtórz hasło"/>
            <b-form-invalid-feedback id="passwordRepeatRegisterFeedback">
              Hasła nie są zgodne
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group id="registerEmailGroup">
            <b-form-input id="registerEmailInput"
                          type="email"
                          v-model="registerForm.email"
                          :state="!$v.registerForm.email.$invalid"
                          aria-describedby="emailRegisterFeedback"
                          placeholder="Wprowadź email"/>
            <b-form-invalid-feedback id="emailRegisterFeedback">
              Podaj prawidłowy adres email
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group id="registerTermsGroup">
            <b-form-checkbox id="registerTerms" class="checkbox-labeled"
                          type="checkbox"
                          v-model="registerForm.terms"
                          :state="!$v.registerForm.terms.$invalid"
                          aria-describedby="termsRegisterFeedback">
              Potwierdzam 100% nieznajomość regulaminu. Kto ma czas na czytanie regulaminów
            </b-form-checkbox>
          </b-form-group>
          <b-form-group id="registerPersonalDataGroup">
            <b-form-checkbox id="registerPersonalData" class="checkbox-labeled"
                             type="checkbox"
                             v-model="registerForm.personalData"
                             :state="!$v.registerForm.personalData.$invalid"
                             aria-describedby="personalDataRegisterFeedback">
              Akceptuję przetwarzanie i wykorzystywanie moich danych w dowolny nieprzewidziany przeze mnie sposób
            </b-form-checkbox>
          </b-form-group>
          <b-button type="submit"
                    variant="primary"
                    :disabled="$v.registerForm.$invalid">
            Rejestracja
          </b-button>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  //import Spinner from '@/components/common/Spinner'
  import {loginUser, registerUser} from '@/userAuth.js'
  import { required, minLength, sameAs, email } from "vuelidate/lib/validators"
  import {mapGetters, mapMutations, mapActions} from 'vuex'


  export default {
    name: 'LoginPage',
    components: {
    	//Spinner
    },
    data () {
      return {
        loginCredentials: {
          username: '',
          password: ''
        },
        registerCredentials: {
          username: '',
          password: '',
          repeatedPassword: '',
          email: '',
          terms: false,
          personalData: false,
        },
        communicating: false,
        error: '',
        loginForm: {},
        registerForm: {},
      }
    },
    validations: {
      loginForm: {
        username: {
          required,
        },
        password: {
          required,
        },
      },
      registerForm: {
        username: {
          required,
        },
        firstName: {
          required,
        },
        lastName: {
          required,
        },
        password: {
          required,
        },
        passwordRepeat: {
          sameAsPassword: sameAs('password'),
        },
        email: {
          required,
          email,
        },
        terms: {
          required,
          mustBeTrue: (value) => {return value===true}
        },
        personalData: {
          required,
          mustBeTrue: (value) => {return value===true}
        },
      },
    },
    methods: {
      ...mapActions([
      	'loginUser',
        'registerUser',
      ]),
      async submitLogin () {
        const credentials = {
          username: this.loginForm.username,
          password: this.loginForm.password
        };
        await this.loginUser(credentials);
        this.$router.push('/');
      },

      async submitRegister () {
        const credentials = {
          username: this.registerForm.username,
          firstName: this.registerForm.firstName,
          lastName: this.registerForm.lastName,
          email: this.registerForm.email,
          password: this.registerForm.password,
        };
        await this.registerUser(credentials);
      }
    }
  }
</script>

<style scoped>
  .login-form {
    margin-top: 100px;
    padding-left: 25%;
    padding-right: 25%;
  }
  .checkbox-labeled {
    text-align: justify;
  }
</style>
