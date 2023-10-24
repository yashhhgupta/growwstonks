import styles from "./NavBar.module.css"
import { TbArrowZigZag } from "react-icons/tb"
import Link from 'next/link';
import Search from "../components/Search/Search"
const NavBar = () => {

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <Link href="/">
        <div className={styles.title}>
          GrowwStonks&nbsp;
          <TbArrowZigZag />
        </div>
        </Link>
        <Search />
      </div>
    </div>
  )
}

export default NavBar