resource "kubernetes_namespace" "node_api_boilerplate" {
  metadata {
    name = "app-dev"
  }
}

resource "kubernetes_deployment" "nginx" {
  metadata {
    name = "nginx"
    namespace = kubernetes_namespace.node_api_boilerplate.metadata[0].name
  }

  spec {
    replicas = 2

    selector {
      match_labels = {
        app = "nginx"
      }
    }

    template {
      metadata {
        labels = {
          app = "nginx"
        }
      }

      spec {
        container {
          name  = "nginx"
          image = "nginx:1.21"
          port {
            container_port = 80
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "nginx" {
    metadata {
        name = "nginx"
        namespace = kubernetes_namespace.node_api_boilerplate.metadata.0.name
    }
    spec {
        selector = {
            app = kubernetes_deployment.nginx.spec.0.template.0.metadata.0.labels.app
        }
        port {
            port = 80
        }
    }
}
