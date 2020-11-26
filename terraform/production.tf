module "production-static-site" {
  source = "git@github.com:PrototypeInteractive/terraform-modules//static-site"
  
  aws_region = "${var.aws_region}"
  environment = "production"
  github_organization = "${var.github_organization}"
  github_repository = "${var.github_repository}"
  github_branch = "master"
  project = "${var.project_name}"

  cloudfront_domain_names = [
    "diyar.bh",
    "www.diyar.bh",
    "production.diyar.bh",
    "diyar-production.prototype-interactive.com"
  ]

  codebuild_environment_parameters = [
    # { name = "SITE_BUCKET" value = "${module.production-static-site.static_site_bucket}" },
    # { name = "CLOUDFRONT_DISTRIBUTION_ID" value = "${module.production-static-site.cloudfront_distribution_id}" },
    { name = "CONTENTFUL_ACCESS_TOKEN" value = "${var.contentful_access_token}" },
    { name = "CONTENTFUL_SPACE_ID" value = "${var.contentful_space_id}" },
    { name = "GATSBY_LIVECHAT_ID" value = "${var.gatsby_livechat_id}" }
  ]

  providers = {
    aws = "aws"
    aws.us-east-1 = "aws.us-east-1"
  }
}
