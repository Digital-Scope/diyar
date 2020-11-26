# Gatsby CodePipeline Template

Create a file "terraform.tfvars" and populate it with the following:
```
aws_access_key = "YOURACCESSKEY"

aws_secret_key = "YOURSECRETKEY"

project_name = "project-name"

contentful_access_token = "CONTENTFUL_DELIVERY_KEY"

contentful_space_id = "CONTENTFUL_SPACE_ID"

gatsby_livechat_id = "GATSBY_LIVECHAT_ID"

```

Also have a look in [terraform/variables.tf](terraform/variables.tf) and make sure any
settings there are sane.

# Using this template
This template assumes you've already created a GitHub repo and Contentful space.

You'll need to install [Terraform](https://www.terraform.io/intro/getting-started/install.html).

Initialize the Terraform plugins and backend:
```bash
$ terraform get -update
$ terraform init
```

Make a plan:
```bash
$ terraform plan -out=project.plan
```

Review it and if you like what you see, apply it:
```bash
$ terraform apply project.plan
```

Tada! Infrastructure!
