<template>
    <div class="image avatar relative" v-bind:class="{'initials': !isUpdating && !(data && data.sizes)}">
        <Upload v-if="isUpdating" class="upload" @done="handleUpload"></Upload>
        <img class="is-round" v-else-if="data && data.sizes"
             :src="cleanURI(data.sizes[size] ? data.sizes[size] : data.path)" alt="">
        <span v-else-if="name">{{avatarName(name, 2)}}</span>
        <b-icon v-else :icon="icon"></b-icon>
        <div v-if="canUpdate" class="medal" @click="isUpdating = !isUpdating">
            <b-icon size="is-small" :icon="isUpdating ? 'close' : 'upload'"></b-icon>
        </div>
        <div v-if="canUpdate && data" class="delete" @click="data = null"></div>
    </div>
</template>

<script>
    import Upload from "./Upload";

    export default {
        name: "Avatar",
        components: {
            Upload
        },
        props: {
            canUpdate: {
                type: Boolean,
                default: false
            },
            value: {
                default: null,
                type: Object
            },
            name: {
                default: null
            },
            icon: {
                default: 'account-circle-outline',
                type: String
            },
            size: {
                default: 'thumb_247_247'
            }
        },
        data() {
            return {
                data: this.value,
                isUpdating: false
            }
        },
        methods: {
            handleUpload(files) {
                if (files.length) {
                    this.data = files[0]
                    this.isUpdating = false
                }
            },
            cleanURI(url) {
                if (url) {
                    return url.split("?")[0].split("#")[0];
                }
                return null
            },
            avatarName(name, length) {
                let matches = name.match(/\b(\w)/g);
                if (length) {
                    return matches.join('').substr(0, length)
                }
                return matches.join('')
            }
        },
        watch: {
            data() {
                this.$emit('input', this.data)
            },
            value() {
                this.data = this.value
            }
        }
    }
</script>

<style lang="scss">
    .upload {
        width: 100%;
        height: 100%;

        .upload-draggable {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
    }

    .avatar {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
    }

    .initials {
        border: 1px solid #DDD;
    }

    .relative {
        position: relative;

        .delete {
            position: absolute;
            right: .5rem;
            bottom: .5rem;
            background-color: red;
        }
    }

    .medal {
        position: absolute;
        right: .5rem;
        top: .5rem;
        cursor: pointer;
    }
</style>
