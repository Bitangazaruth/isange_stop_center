# config.hcl app configuration file generated for isange on Tuesday, 14-Jan-25 00:17:21 CAT
#
# See https://github.com/quarksgroup/andasy-cli for information about how to use this file.

app_name = "isange"

app {

  port = 8080

  compute {
    cpu      = 1
    memory   = 256
    cpu_kind = "shared"
  }

  process {
    name = "isange"
  }

}
