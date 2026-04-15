variable "vercel_api_token" {
  type      = string
  sensitive = true
}

variable "team" {
  type        = string
  description = "Vercel team slug or id (personalなら空でも可)"
  default     = ""
}

variable "project_name" {
  type        = string
  description = "Vercel Project name"
  default     = "techblog"
}

variable "domain" {
  type        = string
  description = "Custom domain to attach"
  default     = "techblog.keitaroooo.com"
}
