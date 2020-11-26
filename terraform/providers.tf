terraform {
  backend "s3" {
    bucket = "terraform-ap-southeast-1-510251375029"
    dynamodb_table = "terraform-state"
    key = "diyar-almuharraq-website/terraform.tfstate"
    region = "ap-southeast-1"
  }
}

provider "archive" {
  version = "~> 1.1"
}

provider "aws" {
  access_key = "${var.aws_access_key}"
  secret_key = "${var.aws_secret_key}"
  region     = "${var.aws_region}"
  version    = "~> 1.25"
}

# Certain resources, e.g., Lambda@Edge have to be created in us-east-1
provider "aws" {
  alias = "us-east-1"
  access_key = "${var.aws_access_key}"
  secret_key = "${var.aws_secret_key}"
  region     = "us-east-1"
  version    = "~> 1.25"
}

provider "random" {
  version = "~> 2.0"
}
