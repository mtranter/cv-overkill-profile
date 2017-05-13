terraform {
  backend "s3" {
    bucket  = "cv-overkill-tf-state"
    key     = "aws-infrastructure-profile"
    region  = "eu-west-1"
  }
}


variable "region" {
  default = "eu-west-1"
}

provider "aws" {
  region = "${var.region}"
}


module "experience" {
  source = "github.com/mtranter/cv-overkill-terraform?ref=v1.4//modules/tf-cv-overkill-aurelia-module"
  website_files = ["app-bundle.js", "assets/MeBolivia_Trunc.jpg"]
  relative_source_path = "/../src/ui/dist/"
  region = "${var.region}"
  module_name = "profile"
}


resource "aws_iam_policy" "read_profile_policy" {
  name        = "test_policy"
  path        = "/"
  description = "My test policy"

  policy = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "ReadOnlyAPIActionsOnProfile",
            "Effect": "Allow",
            "Action": [
                "dynamodb:GetItem",
                "dynamodb:Scan",
                "dynamodb:BatchGetItem"
            ],
            "Resource": "${aws_dynamodb_table.profile_table.arn}",
            "Condition": {"StringEqualsIgnoreCase": {"aws:Referer": "http://www.marktranter.com/" }}
        }
    ]
  }
EOF
}

resource "aws_iam_role_policy_attachment" "auth_dynamo_attach" {
    role       = "cv_overkill_auth_role"
    policy_arn = "${aws_iam_policy.read_profile_policy.arn}"
}

resource "aws_iam_role_policy_attachment" "unauth_dynamo_attach" {
    role       = "cv_overkill_unauth_role"
    policy_arn = "${aws_iam_policy.read_profile_policy.arn}"
}


resource "aws_dynamodb_table" "profile_table" {
  name           = "cv_overkill_profile"
  read_capacity  = 1
  write_capacity = 1
  hash_key       = "Name"

  attribute {
    name = "Name"
    type = "S"
  }

}
