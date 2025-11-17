import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  route("/", "routes/dashboard.tsx", [
    index("routes/home.tsx"),
    route("contact-us", "routes/contact-us.tsx"),
    route("about-us", "routes/about-us.tsx"),
    route("blogs", "routes/blogs.tsx"),
    route("blogs/:id", "routes/detailBlog.tsx"),
    route("reports/rsc-audit-reports", "routes/reports/rsc-reports.tsx"),
    route("blogs/view", "routes/view-blog.tsx"),
    route("teams", "routes/team.tsx"),
    route("terms-of-service", "routes/terms-of-service.tsx"),
    route("privacy-policy", "routes/privacy-policy.tsx"),
    route("license", "routes/license.tsx"),
    route("certificates", "routes/certificate.tsx"),
    route("career", "routes/career.tsx"),
    route("upper-outwears", "routes/products/upper-outwear.tsx"),
    route("lower-outwears", "routes/products/lower-outwear.tsx"),
    route("outerwears", "routes/outerwear.tsx"),
    route("workwears", "routes/workwear.tsx"),
    route("fashionwears", "routes/fashionwear.tsx"),
  ]),
] satisfies RouteConfig;
