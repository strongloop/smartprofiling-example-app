>**A [StrongLoop license](#obtain-a-strongloop-license) is required for this
beta demo.**

# LoopBack Smart Profiling Demo

This application is for demonstrating Smart Profiling in StrongLoop Arc.

## Overview

This application is designed to help demonstrate the Smart Profiling feature of
StrongLoop Arc, and illustrate its benefits. The application will send requests
to the PM with a user-defined timeout value.

On the server side, the requests will be processed until the specified timeout
is exceeded. The number of successfully completed operations will be returned to
the client, and shown on a graph in the demo application.

## Requirements

### Minimum Versions

TBD

### StrongLoop license

The StrongArc Smart Profiling is currently under private beta. Please contact
sales@strongloop.com to have a license provisioned. After receiving confirmation
that a license has been provisioned, run `slc arc --licenses` to retrieve the new
license key

>See ["Managing your licenses"](http://docs.strongloop.com/display/SL/Managing+your+licenses).

## Setup

### Setting up Strong PM

In order to use Smart Profiling, your application must be running inside of a
StrongLoop PM instance.

For more information about StrongLoop PM, [http://strong-pm.io](http://strong-pm.io)

#### Supported Platforms

Smart profiling is currently only supported on StrongLoop PM deployments running
on Linux systems.

### Deploy the Application

First you'll need to download the application

```
slc build
```

```
slc deploy http://<pm server>:<pm port>/
```

It's recommended for this demo, that you only run one worker instance on the PM.

### Connect to the application

In your web browser, navigate to application running on the PM. Typically this
will be at: `http://<pm host>:3001/`.

### Start StrongArc

From inside the smartprofiling-demo application directory, run

```
slc arc
```

## Running the Demonstration

Enter the Profiler module in Strong Arc, by clicking the profiler button on the
Strong Arc landing page.

On the Profiler page, enter the host and port information for you Strong PM, and
click 'load'.

### Setting up the Smart Profiler Settings

You can configure the Smart Profiler settings by clicking the "Profiler Settings"
option the will appear beside the PID list in the Arc profiler.

> If you do not see the profiler settings option, then the Strong PM does not
> support all the options required for using Smart Profiling from within Arc.
> Please check requirement section and confirm that StrongLoop PM is running
> the correct version.

In the profiler settings window, there are two options:

#### Timeout

This value is the minimum amount of time the process which is profiling needs
spend processing a request before it begins recording profiling data for that
request. Increasing this value will reduce the overhead of running profiling,
my limiting the amount of time the profiling is running on the processes.

#### Max Cycles

The profile data for a process will not be available until after profiling has
been turned off for that processes. Profiling can either be manually turned off
(by selecting the PID, and clicking the 'stop' button) or it can be
automatically turned off after the profiler has triggered (by exceeding the
profiler timeout) a specified number of times.

The value for these options is highly depended on the application that is being
profiled. For this demo:

Set "timeout" to "50 ms"
Set "cycles" to "10".

### Start the Profiler

Select the all PIDs from the PID list, and click "start" on the profiler.

> Selecting multiple PIDs for profiling is only available when using Smart
> Profiling

### Running the Demo Application

Navigate to the Demo application. Set the timeout to "50" and click "Start"

The application will start sending requests, which will process for the time
specified. The amount of work done before the timeout specified will be shown
on the graph.

Increase the timeout value to "150"

---

[Other LoopBack demos](https://github.com/strongloop/loopback-demo)
