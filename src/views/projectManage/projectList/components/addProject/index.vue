<template>
  <a-form-model ref="form" :model="form" :rules="rules">
    <a-form-model-item label="项目名称" prop="name">
      <a-input v-model="form.name" placeholder="请输入项目名称" />
    </a-form-model-item>
    <a-row :gutter="10">
      <a-col :span="6">
        <a-form-model-item label="画布宽度" prop="name">
          <a-input-number
            v-model="form.width"
            :min="500"
            :max="10000"
            :formatter="value => `${value}px`"
            :parser="value => value.replace('px', '')"
            placeholder="请输入画布宽度"
          />
        </a-form-model-item>
      </a-col>
      <a-col :span="6">
        <a-form-model-item label="画布高度" prop="name">
          <a-input-number
            v-model="form.height"
            :min="500"
            :max="10000"
            :formatter="value => `${value}px`"
            :parser="value => value.replace('px', '')"
            placeholder="请输入画布高度"
          />
        </a-form-model-item>
      </a-col>
      <a-col :span="6">
        <a-form-model-item label="画布背景" prop="name">
          <a-input v-model="form.background" placeholder="请输入十六进制颜色" />
        </a-form-model-item>
      </a-col>
    </a-row>
  </a-form-model>
</template>
<script>
import { nanoid } from "nanoid";
export default {
  data() {
    return {
      form: {
        name: "",
        width: 1920,
        height: 1080,
        background: "#000000"
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入项目名称",
            trigger: "blur"
          }
        ],
        width: [
          {
            required: true,
            message: "请输入项目名称",
            trigger: "blur"
          }
        ],
        height: [
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
                projectList.push({
                  id: nanoid(),
                  name: this.form.name,
                  options: {
                    width: this.form.width,
                    height: this.form.height,
                    background: this.form.background
                  }
                });
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
