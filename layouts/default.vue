<template>
    <div>
        <main class="main-content">
            <nuxt/>
        </main>
        <footer class="footer">
            <div class="content has-text-centered">
                <p>
                    <strong>
                        <n-link to="/">Cheat Sheet Maker</n-link>
                    </strong> made with <3
                </p>
            </div>
        </footer>
        <b-modal has-modal-card :active.sync="active">
            <div class="modal-card" style="width: auto">
                <header class="modal-card-head">
                    <p class="modal-card-title">Login</p>
                </header>
                <section class="modal-card-body">
                    <div class="field" v-if="!logging">
                        <label class="label">Username</label>
                        <div class="control">
                            <input v-model="form.username" class="input" type="text"
                                   placeholder="Username">
                        </div>
                    </div>
                    <div class="field" v-if="!logging">
                        <div class="field-body">
                            <div class="field">
                                <label class="label">Firstname</label>
                                <b-input v-model="form.first_name" type="text"
                                         placeholder="John"/>
                            </div>
                            <div class="field">
                                <label class="label">Lastname</label>
                                <b-input v-model="form.last_name" type="text"
                                         placeholder="Due"/>
                            </div>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Email</label>
                        <div class="control has-icons-right">
                            <input v-model="form.email" class="input is-success" type="email"
                                   placeholder="Email">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Password</label>
                        <div class="control has-icons-right">
                            <b-input type="password" v-model="form.password" password-reveal
                                     placeholder="Password"/>
                        </div>
                    </div>
                    <div class="field">
                        <div class="level is-mobile">
                            <div class="level-left">
                                <div class="button is-text" @click="logging = !logging">
                                    {{ logging ? 'Register' : 'Login' }}
                                </div>
                            </div>
                            <div class="level-right">
                                <div class="button" @click="handleSubmit">{{
                                        logging ? 'Login' :
                                            'Register'
                                    }}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </b-modal>
    </div>
</template>

<script>
export default {
    data() {
        return {
            active: false,
            logging: false,
            form: {
                email: null,
                username: null,
                password: null
            }
        }
    },
    methods: {
        open(flag) {
            this.logging = !flag;
            this.active = true
        },
        async logout() {
            await this.$auth.logout();
            this.$router.replace({path: '/'});
        },
        async handleSubmit() {
            if (this.logging) {
                await this.$auth.login({
                    email: this.form.email,
                    password: this.form.password
                }).then(res => {
                    console.log(res);
                })
            } else {
                this.$axios.post('/auth/rest-auth/registration/', {
                    ...this.form,
                    password1: this.form.password,
                    password2: this.form.password
                }).then((res) => {
                    console.log(res);
                }).catch(error => {
                    console.log(error);
                });
            }
        }
    },
    mounted() {
        window.addEventListener("keypress", e => {
            if (String.fromCharCode(e.keyCode) === 'lo') {
                this.active = true;
            }
        });
    }
}
</script>
