module "staging-static-site" {
  source = "git@github.com:PrototypeInteractive/terraform-modules//static-site"
  
  aws_region = "${var.aws_region}"
  environment = "staging"
  github_organization = "${var.github_organization}"
  github_repository = "${var.github_repository}"
  github_branch = "staging"
  project = "${var.project_name}"

  cloudfront_domain_names = [
    "staging.diyar.bh",
    "diyar-staging.prototype-interactive.com"
  ]

  codebuild_environment_parameters = [
    { name = "CONTENTFUL_ACCESS_TOKEN" value = "${var.contentful_access_token}" },
    { name = "CONTENTFUL_SPACE_ID" value = "${var.contentful_space_id}" }
  ]

  providers = {
    aws = "aws"
    aws.us-east-1 = "aws.us-east-1"
  }
}
