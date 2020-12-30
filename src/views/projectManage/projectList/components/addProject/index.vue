<template>
  <a-form-model ref="form" :model="form" :rules="rules">
    <a-form-model-item label="项目名称" prop="name">
      <a-input v-model="form.name" placeholder="请输入项目名称" />
    </a-form-model-item>
  </a-form-model>
</template>
<script>
import { nanoid } from "nanoid";
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
      return new Promise((resolve, reject) => {
        this.$refs.form.validate(valid => {
          if (valid) {
            setTimeout(() => {
              try {
                let projectList = this.$local.get("project-list") || [];
                if (
                  projectList.filter(obj => obj.name === this.form.name)
                    .length > 0
                ) {
                  this.$message.warning("项目名称已存在");
                  reject();
                  return;
                }
                projectList.push({ id: nanoid(), name: this.form.name });
                this.$local.set("project-list", projectList);
                this.$message.success("创建项目成功");
                resolve();
              } catch (error) {
                console.error(error);
                reject();
              }
            }, 100);
          } else {
            reject();
            return false;
          }
        });
      });
    }
  }
};
</script>
