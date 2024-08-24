import React from "react"
import { Link } from "react-router-dom"



function Dashboard(){
    return(
                <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Dashboard</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/admin">Home</Link></li>
                            <li className="breadcrumb-item active">Dashboard</li>
                        </ol>
                    </nav>
                </div>
                <section className="section dashboard">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="row">
                                <div className="col-xxl-4 col-md-6">
                                <div className="card info-card sales-card">
                                    <div className="filter">
                                    <Link className="icon"   data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></Link>
                                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                        <li className="dropdown-header text-start">
                                        <h6>Filter</h6>
                                        </li>
                                        <li><Link className="dropdown-item"  >Today</Link></li>
                                        <li><Link className="dropdown-item"  >This Month</Link></li>
                                        <li><Link className="dropdown-item"  >This Year</Link></li>
                                    </ul>
                                    </div>
                                    <div className="card-body">
                                    <h5 className="card-title">Sales <span>| Today</span></h5>

                                    <div className="d-flex align-items-center">
                                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                        <i className="bi bi-cart"></i>
                                        </div>
                                        <div className="ps-3">
                                        <h6>145</h6>
                                        <span className="text-success small pt-1 fw-bold">12%</span> <span className="text-muted small pt-2 ps-1">increase</span>
                                        </div>
                                    </div>
                                    </div>

                                </div>
                                </div>
                                <div className="col-xxl-4 col-md-6">
                                    <div className="card info-card revenue-card">

                                        <div className="filter">
                                        <Link className="icon"   data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></Link>
                                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                            <li className="dropdown-header text-start">
                                            <h6>Filter</h6>
                                            </li>

                                            <li><Link className="dropdown-item"  >Today</Link></li>
                                        <li><Link className="dropdown-item"  >This Month</Link></li>
                                        <li><Link className="dropdown-item"  >This Year</Link></li>
                                        </ul>
                                        </div>

                                        <div className="card-body">
                                        <h5 className="card-title">Revenue <span>| This Month</span></h5>

                                        <div className="d-flex align-items-center">
                                            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                            <i className="bi bi-currency-dollar"></i>
                                            </div>
                                            <div className="ps-3">
                                            <h6>$3,264</h6>
                                            <span className="text-success small pt-1 fw-bold">8%</span> <span className="text-muted small pt-2 ps-1">increase</span>

                                            </div>
                                        </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="col-xxl-4 col-xl-12">
                                    <div className="card info-card customers-card">

                                        <div className="filter">
                                        <Link className="icon"   data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></Link>
                                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                            <li className="dropdown-header text-start">
                                            <h6>Filter</h6>
                                            </li>

                                            <li><Link className="dropdown-item"  >Today</Link></li>
                                            <li><Link className="dropdown-item"  >This Month</Link></li>
                                            <li><Link className="dropdown-item"  >This Year</Link></li>
                                        </ul>
                                        </div>

                                        <div className="card-body">
                                        <h5 className="card-title">Customers <span>| This Year</span></h5>

                                        <div className="d-flex align-items-center">
                                            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                            <i className="bi bi-people"></i>
                                            </div>
                                            <div className="ps-3">
                                            <h6>1244</h6>
                                            <span className="text-danger small pt-1 fw-bold">12%</span> <span className="text-muted small pt-2 ps-1">decrease</span>

                                            </div>
                                        </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="card">
                                        <div className="filter">
                                        <Link className="icon"   data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></Link>
                                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                            <li className="dropdown-header text-start">
                                            <h6>Filter</h6>
                                            </li>

                                            <li><Link className="dropdown-item"  >Today</Link></li>
                                            <li><Link className="dropdown-item"  >This Month</Link></li>
                                            <li><Link className="dropdown-item"  >This Year</Link></li>
                                        </ul>
                                        </div>

                                        <div className="card-body">
                                        <h5 className="card-title">Reports <span>/Today</span></h5>

                                        <div id="reportsChart"></div>
                                        </div>

                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="card recent-sales overflow-auto">

                                        <div className="filter">
                                        <Link className="icon"   data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></Link>
                                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                            <li className="dropdown-header text-start">
                                            <h6>Filter</h6>
                                            </li>

                                            <li><Link className="dropdown-item"  >Today</Link></li>
                                            <li><Link className="dropdown-item"  >This Month</Link></li>
                                            <li><Link className="dropdown-item"  >This Year</Link></li>
                                        </ul>
                                        </div>

                                        <div className="card-body">
                                        <h5 className="card-title">Recent Sales <span>| Today</span></h5>

                                        <table className="table table-borderless datatable">
                                            <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Customer</th>
                                                <th scope="col">Product</th>
                                                <th scope="col">Price</th>
                                                <th scope="col">Status</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <th scope="row"><Link>#2457</Link></th>
                                                <td>Brandon Jacob</td>
                                                <td><Link className="text-primary">At praesentium minu</Link></td>
                                                <td>$64</td>
                                                <td><span className="badge bg-success">Approved</span></td>
                                            </tr>
                                            <tr>
                                                <th scope="row"><Link  >#2147</Link></th>
                                                <td>Bridie Kessler</td>
                                                <td><Link   className="text-primary">Blanditiis dolor omnis similique</Link></td>
                                                <td>$47</td>
                                                <td><span className="badge bg-warning">Pending</span></td>
                                            </tr>
                                            <tr>
                                                <th scope="row"><Link  >#2049</Link></th>
                                                <td>Ashleigh Langosh</td>
                                                <td><Link   className="text-primary">At recusandae consectetur</Link></td>
                                                <td>$147</td>
                                                <td><span className="badge bg-success">Approved</span></td>
                                            </tr>
                                            <tr>
                                                <th scope="row"><Link  >#2644</Link></th>
                                                <td>Angus Grady</td>
                                                <td><Link   className="text-primar">Ut voluptatem id earum et</Link></td>
                                                <td>$67</td>
                                                <td><span className="badge bg-danger">Rejected</span></td>
                                            </tr>
                                            <tr>
                                                <th scope="row"><Link  >#2644</Link></th>
                                                <td>Raheem Lehner</td>
                                                <td><Link   className="text-primary">Sunt similique distinctio</Link></td>
                                                <td>$165</td>
                                                <td><span className="badge bg-success">Approved</span></td>
                                            </tr>
                                            </tbody>
                                        </table>

                                        </div>

                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="card top-selling overflow-auto">

                                        <div className="filter">
                                        <Link className="icon"   data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></Link>
                                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                            <li className="dropdown-header text-start">
                                            <h6>Filter</h6>
                                            </li>

                                            <li><Link className="dropdown-item"  >Today</Link></li>
                                            <li><Link className="dropdown-item"  >This Month</Link></li>
                                            <li><Link className="dropdown-item"  >This Year</Link></li>
                                        </ul>
                                        </div>

                                        <div className="card-body pb-0">
                                        <h5 className="card-title">Top Selling <span>| Today</span></h5>

                                        <table className="table table-borderless">
                                            <thead>
                                            <tr>
                                                <th scope="col">Preview</th>
                                                <th scope="col">Product</th>
                                                <th scope="col">Price</th>
                                                <th scope="col">Sold</th>
                                                <th scope="col">Revenue</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <th scope="row"><Link  ><img src="assets/img/product-1.jpg" alt=""/></Link></th>
                                                <td><Link   className="text-primary fw-bold">Ut inventore ipsa voluptas nulla</Link></td>
                                                <td>$64</td>
                                                <td className="fw-bold">124</td>
                                                <td>$5,828</td>
                                            </tr>
                                            <tr>
                                                <th scope="row"><Link ><img src="assets/img/product-2.jpg" alt=""/></Link></th>
                                                <td><Link   className="text-primary fw-bold">Exercitationem similique doloremque</Link></td>
                                                <td>$46</td>
                                                <td className="fw-bold">98</td>
                                                <td>$4,508</td>
                                            </tr>
                                            <tr>
                                                <th scope="row"><Link  ><img src="assets/img/product-3.jpg" alt=""/></Link></th>
                                                <td><Link   className="text-primary fw-bold">Doloribus nisi exercitationem</Link></td>
                                                <td>$59</td>
                                                <td className="fw-bold">74</td>
                                                <td>$4,366</td>
                                            </tr>
                                            <tr>
                                                <th scope="row"><Link  ><img src="assets/img/product-4.jpg" alt=""/></Link></th>
                                                <td><Link   className="text-primary fw-bold">Officiis quaerat sint rerum error</Link></td>
                                                <td>$32</td>
                                                <td className="fw-bold">63</td>
                                                <td>$2,016</td>
                                            </tr>
                                            <tr>
                                                <th scope="row"><Link  ><img src="assets/img/product-5.jpg" alt=""/></Link></th>
                                                <td><Link   className="text-primary fw-bold">Sit unde debitis delectus repellendus</Link></td>
                                                <td>$79</td>
                                                <td className="fw-bold">41</td>
                                                <td>$3,239</td>
                                            </tr>
                                            </tbody>
                                        </table>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                </main>        
    )
}

export default Dashboard