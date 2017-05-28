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
  website_files = ["app-bundle.js", "assets/header.jpg"]
  relative_source_path = "/../src/ui/dist/"
  region = "${var.region}"
  module_name = "profile"
}

//Condition for puts
//cognito-identity.amazonaws.com:sub eu-west-1:29af7465-20f2-41b1-ba97-19392f9503a2

resource "aws_iam_policy" "write_profile_policy" {
  name        = "ProfileWrite"
  path        = "/"
  description = "Can write dynamo profile"

  policy = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "WriteAPIActionsOnProfile",
            "Effect": "Allow",
            "Action": [
                "dynamodb:*"
            ],
            "Resource": "${aws_dynamodb_table.profile_table.arn}"
        }
    ]
  }
EOF
}

resource "aws_iam_policy" "read_profile_policy" {
  name        = "ProfileRead"
  path        = "/"
  description = "Can read dynamo profile"

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

resource "aws_iam_role_policy_attachment" "write_dynamo_attach" {
    role       = "cv_overkill_admin_role"
    policy_arn = "${aws_iam_policy.write_profile_policy.arn}"
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
