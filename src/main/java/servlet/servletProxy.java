//package servlet;
//
//import java.lang.reflect.InvocationHandler;
//import java.lang.reflect.Method;
//import java.lang.reflect.Proxy;
//
//public class servletProxy implements InvocationHandler {
//    private Object obj;
//
//
//    public servletProxy(Object obj) {
//        this.obj = obj;
//    }
//
//    public Object getProxy() {
//        return  Proxy.newProxyInstance(obj.getClass().getClassLoader(), obj.getClass().getInterfaces(), this);
//    }
//
//    @Override
//    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
//        return null;
//    }
//}
