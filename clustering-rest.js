// if(cluster.isMaster) {
//      Executing one more time in childMode
//     cluster.fork();
//      cluster.fork();
//      cluster.fork();
//      cluster.fork();
// }
// } else {
    app code
}
    // Loading the CPU and blocking the event loop

    // function doWork(duration) {
    //     const start = Date.now();
    //     while(Date.now() - start < duration) { }
    // };

pm2 start <filename> -i 0(number of custers bound to logical CPUs) - running n clusters
pm2 list - to inspect all clusters
pm2 monit - to monit the performance
pm2 delete <clusterName>