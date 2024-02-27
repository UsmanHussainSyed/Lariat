export default function ({ $_auth, $auth, redirect, error, route }) {
  if ($_auth().user.lead && $_auth().user.lead.isDealerAdmin) {
    error({
      statusCode: 401,
      path: route.path,
      message: 'You are not authorized to access this page.',
    })
  }
}
