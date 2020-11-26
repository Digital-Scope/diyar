# Variables that must be provided, either via a "terraform.tfvars" file,
# environment variables, or interactively.

variable "aws_access_key" {}

variable "aws_secret_key" {}

variable "contentful_access_token" {}

variable "contentful_space_id" {}

variable "gatsby_livechat_id" {}

variable "project_name" {}

# Variables with sane defaults that may be overridden
# variable "acm_certificate_arn" {
#   default = "arn:aws:acm:us-east-1:510251375029:certificate/"
# }

variable "aws_region" {
  default = "ap-southeast-1"
}

variable "github_organization" {
  default = "PrototypeInteractive"
}

variable "github_repository" {
  default = "diyar-almuharraq"
}
