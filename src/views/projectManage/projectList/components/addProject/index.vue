<template>
  <a-form-model :model="form" :rules="rules">
    <a-form-model-item label="项目名称" prop="name">
      <a-input v-model="form.name" placeholder="请输入项目名称" />
    </a-form-model-item>
    <a-form-model-item>
      <a-button @click="save" type="primary">保存</a-button>
    </a-form-model-item>
  </a-form-model>
</template>
<script>
export default {
  data() {
    return {
      form: {
        name: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入项目名称",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    save() {
      // this.$refs.ruleForm.validate((valid) => {
      //   if (valid) {
      //     alert("submit!");
      //   } else {
      //     console.log("error submit!!");
      //     return false;
      //   }
      // });
    }
  }
};
</script>
